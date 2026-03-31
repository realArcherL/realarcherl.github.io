---
title: 'Threshold based HIL: Orchestrated by Server'
date: 2026-03-29
categories: security
keywords: mcp
---

<p style="background-color: #d0e8d0; color: #505050; padding: 20px; border-radius: 5px; font-family: Arial, sans-serif;">
<b>Disclaimer:</b> All opinions and views in this article are my own. When citing, please call me an Independent Security Researcher.
</p>

The best security control in agent systems is often not a sandbox, a policy engine, or a classifier. It is a well-timed interruption. In AI systems, that interruption can be what breaks the exploit chain.

Human-in-the-loop (HIL) works, but it also adds friction. As [Yampolskiy](https://link.springer.com/article/10.1007/s43681-024-00420-x) notes: "One major issue with human-in-the-loop monitoring is that humans may not be able to keep up with the speed and complexity of AI systems, particularly as they continue to advance and outpace human capabilities." **That raises a practical question:**

**What if some of that burden moved to the host OR... let's say the server?**

For example, [VS Code](https://code.visualstudio.com/updates/v1_97#_agent-mode-experimental) already pauses long-running agent sessions on the host side. In agent mode, Copilot Edits may use many chat requests, so VS Code periodically asks whether to continue; this is configurable through `chat.agent.maxRequests`. What I’m interested in is a second layer: the server itself noticing when invocation patterns look unusual and triggering a checkpoint before continuing.

Instead of acting as a passive executor, the server can watch how tools are being used. If invocation frequency becomes unusual, or access patterns no longer resemble normal user behavior, the server can pause execution and explicitly elicit approval before continuing.

## What I mean by this

MCP [tool annotations](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#tool) can describe intent. `readOnlyHint` helps identify non-destructive tools. `destructiveHint` helps flag operations that deserve tighter review.

> _But those fields are only hints, not trust anchors, especially when the server is not fully trusted._

What is more interesting is what the server can do beyond that. The server can track thresholds within a session. Things like repeated read activity or unusual invocation patterns. Once a threshold is crossed, the server can use MCP [elicitation](https://modelcontextprotocol.io/specification/draft/client/elicitation) to pause the workflow and force a client-side approval step.

Here is how it works in the code below. The `add` tool is wrapped by `gateAdd()`. It counts how many times the tool is invoked in a session. The first three calls pass normally. On the fourth call, the server pauses and asks the user for approval via elicitation. If approved, the call goes through. If denied, it is blocked. The `pending` variable makes sure that if multiple requests arrive while approval is pending, they all wait on the same prompt instead of spawning duplicate dialogs. Once resolved, the counter resets.

<div class="mermaid">
flowchart LR
    A[Agent calls tool] --> B{count <= threshold?}
    B -- Yes --> C[Allow]
    B -- No --> D[Elicit approval]
    D -- Approved --> C
    D -- Denied --> E[Block]
</div>

<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin: 1.5em 0; align-items: stretch;">
  <div style="flex: 1; min-width: 250px; max-width: 48%; text-align: center; display: flex; flex-direction: column;">
    <a href="https://www.loom.com/share/38b9c0518eac4b2e8eabebfaebc0c05b" style="flex: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 6px;">
      <img style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" src="https://cdn.loom.com/sessions/thumbnails/38b9c0518eac4b2e8eabebfaebc0c05b-19e65bc1da059942-full-play.gif#t=0.1">
    </a>
    <p style="margin-top: 6px; font-size: 0.85em;">VS Code demo</p>
  </div>
  <div style="flex: 1; min-width: 250px; max-width: 48%; text-align: center; display: flex; flex-direction: column;">
    <a href="https://www.loom.com/share/215863a1373947c4b4a437adf48ddaf4" style="flex: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 6px;">
      <img style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" src="https://cdn.loom.com/sessions/thumbnails/215863a1373947c4b4a437adf48ddaf4-f096b8523df35b13-full-play.gif#t=0.1">
    </a>
    <p style="margin-top: 6px; font-size: 0.85em;">Inspector demo</p>
  </div>
</div>

<div style="max-height: 400px; overflow-y: auto;">

```js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({ name: 'calc-mcp', version: '0.1.0' });

const NumInput = {
  a: z.number().describe('First number'),
  b: z.number().describe('Second number'),
};

const THRESHOLD = 3;
let count = 0;
let pending: Promise<boolean> | null = null;

async function gateAdd(): Promise<boolean> {
  count++;
  if (count <= THRESHOLD) return true;

  if (pending) return pending;

  pending = (async () => {
    try {
      const result = await server.server.elicitInput({
        mode: 'form',
        message: `Add called ${count} times (threshold: ${THRESHOLD}). Allow remaining calls?`,
        requestedSchema: {
          type: 'object',
          properties: {
            approve: { type: 'boolean', title: 'Approve', default: true },
          },
          required: ['approve'],
        },
      });
      return result.action === 'accept' && result.content?.approve === true;
    } finally {
      count = 0;
      pending = null;
    }
  })();

  return pending;
}

server.registerTool(
  'add',
  {
    title: 'Add',
    description: 'Add two numbers.',
    inputSchema: NumInput,
    annotations: { readOnlyHint: true, destructiveHint: false },
  },
  async ({ a, b }) => {
    if (!(await gateAdd()))
      return { content: [{ type: 'text' as const, text: 'Blocked by user.' }] };
    return {
      content: [{ type: 'text' as const, text: `${a} + ${b} = ${a + b}` }],
    };
  },
);

server.registerTool(
  'subtract',
  {
    title: 'Subtract',
    description: 'Subtract two numbers.',
    inputSchema: NumInput,
    annotations: { readOnlyHint: true, destructiveHint: false },
  },
  async ({ a, b }) => ({
    content: [{ type: 'text' as const, text: `${a} - ${b} = ${a - b}` }],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

</div>

## Extending this to real-world scenarios

How does this generalize? Here is my rough thinking:

| Tool type                              | Default policy | When to require approval                                                   |
| -------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| Read only, low sensitivity             | Allow          | When invocation count crosses a threshold or access pattern looks abnormal |
| Read only, high sensitivity            | Ask            | Always, or after a very small threshold                                    |
| Write, delete, send, publish           | Ask            | Always                                                                     |
| External network or open world actions | Ask            | Always, or when destination is not allowlisted                             |

I think this can extend to other protocols too. It remains to be explored, but the building blocks are already there.

| #   | Protocol / system                                                                 | What it requires                                                                                              | Why it matters                         |
| --- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| 1   | [MCP spec](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) | Clients should show confirmation prompts for sensitive operations and users should be able to deny tool calls | Makes HIL a protocol-level expectation |
| 2   | [ACP Spec](https://agentcommunicationprotocol.dev/how-to/await-external-response) | Built-in `Await` mechanism pauses execution until an external response arrives                                |                                        |
| 3   | [A2A Spec](https://a2a-protocol.org/latest/specification/#11-key-goals-of-a2a)    | Task state includes `input-required` so an agent can stop and wait for more input                             |                                        |

## Conclusion

This will scale better than constant approvals, but not infinitely. Hosts like VS Code already use request-limit pauses for long-running sessions, and that works because the interruption is occasional rather than constant. The same idea applies here: a server-side threshold is useful precisely because it is selective. [NIST’s](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.800-4.pdf) broader warning still holds that human oversight does not scale cleanly with the speed and complexity of AI systems, so the goal is not to review everything. The goal is to spend human attention where it still has signal.

It will not scale by making humans review more. It scales by making them review less, but at better moments.

Hope this helps.

\-

END
