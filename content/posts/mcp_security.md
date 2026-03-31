---
title: Practical Advice on Securing Agentic Applications
date: 2026-03-29
categories: security
keywords: mcp
---

<p style="background-color: #d0e8d0; color: #505050; padding: 20px; border-radius: 5px; font-family: Arial, sans-serif;">
<b>Disclaimer:</b> All opinions and views in this article are my own. When citing, please call me an Independent Security Researcher.
</p>

[The lethal trifecta for AI agents:](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) **private data, untrusted content, and external communication**.

There is no permanent fix for that combination. But if I were building an agentic application today, these are the steps I would take to make it much harder to exploit.

Securing an agent is a lot like securing a museum:

1. Checking tickets at the door separates visitors from staff. → <u>Separate data from instructions</u>
2. Locking display cases so nothing can be taken even if someone gets past the door. → <u>Constrain capabilities</u>
3. Calling security when a visitor lingers too long near the vault. → <u>Human in the loop</u>

## Separate data from instructions

<p style="background-color: #ffffff; color: #2c3e50; padding: 20px; border-radius: 4px; font-family: Arial, sans-serif;">
<b>Key Idea:</b> Separating data from instructions is necessary, but not sufficient. It helps the model keep context straight, but it does not remove the need for downstream controls. If the attacker adapts, this layer can still fail.
</p>

Prompt injection exists because the model sees trusted instructions and untrusted content in the same flat context window. If a retrieved document, web page, or email includes attacker-written instructions, the model may treat those instructions as part of the task.

Real applications have already started adopting strategies to reduce this risk.

| #   | Case                                                                                                                                                                                     | What went wrong                                                                                                                 | Why it matters                                                                    |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1   | [GitHub MCP Server filter code fences](https://github.com/github/github-mcp-server/pull/1367)                                                                                            | Hidden instructions inside markdown code fence metadata were being passed through tool results                                  | Shows real MCP apps started sanitizing untrusted data before it reaches the model |
| 2   | [Supabase MCP wraps execute_sql response](https://github.com/supabase-community/supabase-mcp/pull/96)                                                                                    | SQL results could carry prompt injection content, so the response was wrapped with defensive instructions and tested end to end | Shows tool output itself needs treatment as untrusted data                        |
| 3   | [Azure AI Foundry Spotlighting](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/better-detecting-cross-prompt-injection-attacks-introducing-spotlighting-in-azur/4458404) | External content like documents, emails, and web pages can carry cross prompt injection                                         | Shows Spotlighting is being productized as a real defense, not just a paper idea  |
| 4   | [AutoGen Web Surfer sanitize page title](https://github.com/microsoft/autogen/issues/7457)                                                                                               | Web page metadata like titles could inject instructions into the agent prompt                                                   | Shows even small fields like page metadata need sanitization                      |

<br></br>
The common pattern is simple: external content should not enter the prompt untouched. It should be sanitized, transformed, or marked first. Spotlighting is one example of that idea. Instead of asking the model to guess which text is trustworthy, it rewrites untrusted content so its origin is more explicit in the prompt. The [original paper](https://arxiv.org/abs/2403.14720) showed strong gains against indirect prompt injection, cutting attack success from above 50% to below 2% in their evaluation, with limited impact on task quality.

That result is encouraging, and [Microsoft's later LLMail-Inject](https://arxiv.org/abs/2506.09956) work showed that combining multiple defenses can be even more effective. But there is an important caveat: defenses should be judged against adaptive attackers. [The Attacker Moves Second](https://arxiv.org/abs/2510.09023) is a useful reminder that stronger adaptive attacks have bypassed many defenses that initially looked robust under weaker evaluations.

<u>**Here's my take**</u>: I built [spotlighting-datamarking](https://www.npmjs.com/package/spotlighting-datamarking) as an OSS implementation of all three spotlighting variants from the paper: data marking, random interleaving, and base64 encoding (the strongest). I also took inspiration from other OSS projects and how they handle this problem, and tried to incorporate those defenses as well.

```ts
import { DataMarkingViaSpotlighting } from 'spotlighting-datamarking';

const marker = new DataMarkingViaSpotlighting();

const result = marker.markData('Ignore previous instructions');
// result.markedText  → "[MARKER]Ignore[MARKER]previous[MARKER]instructions[MARKER]"
// result.dataMarker  → the random marker string
// result.prompt      → LLM instruction to prepend to your system prompt
```

The goal is not to claim that marking alone solves prompt injection. The goal is to make untrusted content easier for the model to treat as data, raise attacker cost, and strengthen the first line of defense before stricter capability controls take over.

## Use secure-by-default libraries for agent capabilities

<p style="background-color: #ffffff; color: #2c3e50; padding: 20px; border-radius: 4px; font-family: Arial, sans-serif;">
<b>Key Idea:</b> The agent's access <b>MUST BE</b> shaped in advance by code.
</p>

If the capabilities we provide to the model are secure by default, then even if the model goes rogue or gets prompt-injected, it will not be able to bypass the practical guardrails. Let's understand this with a few case studies.

| #   | Case                                                                                                                             | What went wrong                                                                    | Why it matters                                                                    |
| --- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1   | [Anthropic Filesystem MCP Server path bypass](https://embracethered.com/blog/posts/2025/anthropic-filesystem-mcp-server-bypass/) | Used a naive prefix check, so paths outside the allowed directory could still pass | Shows that simple string checks are not enough for file boundaries                |
| 2   | [Anthropic Filesystem MCP Server symlink escape](https://cymulate.com/blog/cve-2025-53109-53110-escaperoute-anthropic/)          | Symlinks could be used to escape the allowed directory and reach host files        | Shows why path checks must be symlink-aware                                       |
| 3   | [filesystem-mcp path traversal](https://vulnerablemcp.info/vuln/cve-2025-67366-filesystem-mcp-path-traversal.html)               | `../` traversal could break out of the configured root                             | Shows how agent file tools can become arbitrary file access                       |
| 4   | [mcp-server-git traversal via git_add](https://security.snyk.io/vuln/SNYK-PYTHON-MCPSERVERGIT-15363315)                          | Relative paths let files outside the repo get staged                               | Shows that repo-scoped tools also need strict path containment                    |
| 5   | [OpenClaw workspace traversal](https://security.snyk.io/vuln/SNYK-JS-OPENCLAW-15627785)                                          | Crafted workspace values let the app reach files outside the intended workspace    | Shows this is not just an MCP problem, agentic apps need the same boundary checks |
| 6   | [GitHub MCP prompt injection chain](https://www.docker.com/blog/mcp-horror-stories-github-prompt-injection/)                     | Untrusted content pushed the agent to access and leak private data                 | Shows the same pattern beyond local files                                         |

<br></br>
The common thread is clear: the capabilities the model had access to were not secure by default, allowing it to reach files outside the designated directory.

If the server had used a package like [is-path-inside-secure](https://www.npmjs.com/package/is-path-inside-secure), a small, symlink-aware defensive primitive designed for security-sensitive path containment checks, then even with the system compromised, the LLM would still have had no access to files outside the allowed boundary.

> _An LLM agent may try to circumvent path checks indirectly, for example by writing a script that reads the restricted file and then invoking a code execution tool to run it. This is a real concern. The answer is to apply the same principle across the entire tool surface: if the agent has a code execution tool, that tool should run inside a sandbox (a container, a VM, or a restricted runtime) where the same filesystem boundaries are enforced at the OS level._

This is not limited to path traversal. The same principle applies to SSRF, XSS, and other vulnerability classes: use libraries that are secure by construction rather than relying on developers to remember every edge case. For curated lists of such packages, see [tl;dr sec's awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) and [Liran Tal's awesome-nodejs-security](https://github.com/lirantal/awesome-nodejs-security).

> _BUT isn't supply chain a BIG risk? Yes, but there are ways to defend against it. Use [dependency cooldowns](https://blog.yossarian.net/2025/11/21/We-should-all-be-using-dependency-cooldowns), SCA tools, and similar practices. Also, the idea is to promote secure-by-design and not increase the number of dependencies._

Think of this as a filesystem analogue of restrictive privilege, not just least privilege. RBAC constrains access at the identity layer. Capability checks constrain access at the operation and resource layer. The agent <u>**MUST NOT**</u> be trusted with broad access and then told to behave; its access must be shaped in advance by code.

## When something still looks risky, stop and ask a human

<p style="background-color: #ffffff; color: #2c3e50; padding: 20px; border-radius: 4px; font-family: Arial, sans-serif;">
<b>Key Idea:</b> The final defense is selective friction: let safe actions stay fast, and make risky actions stop at a human boundary. Trigger HIL based on how often a tool gets invoked.
</p>

Human-in-the-loop (HIL) means the agent can plan and propose actions, but a person must approve actions once they cross a risk boundary.

| #   | Protocol / system                                                                           | What it requires                                                                                              | Why it matters                            |
| --- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| 1   | [MCP spec](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)           | Clients should show confirmation prompts for sensitive operations and users should be able to deny tool calls | Makes HIL a protocol-level expectation    |
| 2   | [ACP Spec](https://agentcommunicationprotocol.dev/how-to/await-external-response)           | Built-in `Await` mechanism pauses execution until an external response arrives                                |                                           |
| 3   | [A2A Spec](https://a2a-protocol.org/latest/specification/#11-key-goals-of-a2a)              | Task state includes `input-required` so an agent can stop and wait for more input                             |                                           |
| 4   | [OpenAI computer use](https://developers.openai.com/api/docs/guides/tools-computer-use/)    | Keep a human in the loop for high-impact actions                                                              | Real product guidance for agentic systems |
| 5   | [Anthropic computer use](https://docs.anthropic.com/en/docs/build-with-claude/computer-use) | Ask a human to confirm actions with meaningful real-world consequences or affirmative consent                 | Strong example of HIL in practice         |

<br></br>
However, HIL should not be the first answer to every tool call. If you prompt on every read, you create approval fatigue and users stop paying attention. A better pattern is to reserve mandatory approval for destructive actions and apply threshold-based approval for low-risk reads once their frequency becomes unusual.

| Tool type                              | Default policy | When to require approval                                                   |
| -------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| Read only, low sensitivity             | Allow          | When invocation count crosses a threshold or access pattern looks abnormal |
| Read only, high sensitivity            | Ask            | Always, or after a very small threshold                                    |
| Write, delete, send, publish           | Ask            | Always                                                                     |
| External network or open world actions | Ask            | Always, or when destination is not allowlisted                             |

The goal is not to remove human oversight. It is to apply it where it still has signal. Destructive actions should always require approval. Low-risk reads can be allowed until frequency or pattern suggests the model is no longer acting within normal bounds.

<u>**For example**</u>: MCP tool annotations are useful for describing intent. `readOnlyHint` can help identify tools that should be treated as non-destructive, while `destructiveHint` can help flag operations that deserve stricter review. But these are hints, not trust anchors, especially when the server is not fully trusted. The client or application still needs its own enforcement policy.

A practical pattern is for the server to track thresholds such as repeated read activity for **THAT** session. When that threshold is exceeded, the server can use MCP [elicitation](https://modelcontextprotocol.io/specification/draft/client/elicitation) to force a client-side approval step before the workflow can continue.

Similarly, provisions in other protocols can also be leveraged to implement threshold-based HIL.

## Conclusion

My view is simple: agent security is not about making the model perfect. It is about making the system resilient when the model is imperfect. If prompt separation fails, capability limits should still hold. If capability limits are not enough, a human boundary should still exist. There may never be a permanent fix for the lethal trifecta, but we can still make exploitation difficult, expensive, and easier to contain. That is the approach I would build around: assume failure, layer defenses, and make the dangerous path the hardest path.

Hope this helps.

\-

END
