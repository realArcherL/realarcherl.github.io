---
title: "Midnight CVEs : Uncovering Path Traversal Vulnerabilities in Open Source"
date: 2024-10-11
categories: hacking
keywords:
---

### TL;DR: A little after-hours sleuthing exposed some path traversal bugs in popular open source projects. Productivity doesn’t always stop at quitting time!

## Intoduction and Goal

On May 02, 2024 CISA released an advisory on <a target = "_blank" rel = "nofollow noopener noreferrer" href="https://www.cisa.gov/resources-tools/resources/secure-design-alert-eliminating-directory-traversal-vulnerabilities-software">"Secure by Design Alert: Eliminating Directory Traversal Vulnerabilities in Software"</a>.

<img src="/images/cisa-1.jpg" width="600" height="100" alt="CISA Path Traversal advisory" style="border:0.5px solid black">

<br>

Me and my **good friend [Kartik](https://www.linkedin.com/in/kartik-sharma-19081998/)** wanted to understand the gravity of this issue, so we started looking for issues in open source projects. The idea was not only to identify issues but also to help developers fix them either by suggesting solutions or raising a PR.

## Preventive measures

But before we dive in we wanted to cover some of the preventive measures suggested by CISA in the document [here](https://www.cisa.gov/sites/default/files/2024-05/Secure_by_Design_Alert_Eliminating_Directory_Traversal_Vulnerabilities_in_Software_508c%20%283%29.pdf)

> 1. Consider generating a random identifier for each file and storing associated metadata separately <mark>(e.g., in a
>    database) rather than using user input when naming files.</mark>

One great example of this is by [actual-server](https://github.com/actualbudget/actual-server/tree/master): [here](https://github.com/actualbudget/actual-server/blob/master/src/app-sync.js#L287), they have a route called `/download-user-file`.

```js
app.get("/download-user-file", async (req, res) => {
  let accountDb = getAccountDb()
  let fileId = req.headers["x-actual-file-id"]
  if (typeof fileId !== "string") {
    // FIXME: Not sure how this cannot be a string when the header is
    // set.
    res.status(400).send("Single file ID is required")
    return
  }

  // Do some authentication
  let rows = accountDb.all(
    "SELECT id FROM files WHERE id = ? AND deleted = FALSE",
    [fileId]
  )
  if (rows.length === 0) {
    res.status(400).send("User or file not found")
    return
  }

  res.setHeader("Content-Disposition", `attachment;filename=${fileId}`)
  res.sendFile(getPathForUserFile(fileId))
})
```

The `fileID` is an ID generated by the database and is checked [against the database for existence first](https://github.com/actualbudget/actual-server/blob/master/src/app-sync.js#L298). If the value is found, only then is the file returned. In my opinion, having an additional check for "Path Traversal Input" would be redundant as the lookup from the database already verifies it. They are spot on with the secure design; they generated a random identifier and stored the metadata in the database.

> 2. In the case where the above approach is not taken, strictly limit the types of characters that can be supplied in file names, e.g., <mark> by restricting to alphanumeric characters </mark>. Also ensure that uploaded files do not have
>    executable permissions.

While it might not always be feasible or possible to use the first suggested preventive measure, the second point should be easy to follow and implement. This is what we ended up suggesting or adding in the code with our PRs to fix the vulnerabilities we found.

However, sometimes allowing or creating arbitrary files could be a feature like: CVE-2024-43797.

## CVEs

<!--
### 2. CVE-2024-

`Base Score:`
`Vector:`

Quick Links: (<a target = "_blank" rel = "nofollow noopener noreferrer" href="">NIST</a>, <a target = "_blank" rel = "nofollow noopener noreferrer" href="">POC</a>)

<mark><a target = "_blank" rel = "nofollow noopener noreferrer" href="">
Commit:
</a></mark> introduced the issue.

1. **Issue**:
2. **POC**: Here's the <a target = "_blank" rel = "nofollow noopener noreferrer" href="">Loom</a> of me reproducing the issue.
3. **Fix**: Fixed <mark><a target = "_blank" rel = "nofollow noopener noreferrer" href="">
Commit:
</a></mark>.
-->

### 1. CVE-2024-39918

`Base Score:` 4.3 MEDIUM <br>
`Vector:` CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N <br>
`Stars`: 157

Quick Links: (<a target = "_blank" rel = "nofollow noopener noreferrer" href="https://nvd.nist.gov/vuln/detail/CVE-2024-39918">NIST</a>, <a target = "_blank" rel = "nofollow noopener noreferrer" href="https://github.com/jasonraimondi/url-to-png/security/advisories/GHSA-vvmv-wrvp-9gjr">POC</a>)

1. **Issue**:
   Path traversal occurred due to a lack of sanitization of user input for the file name. However, this was slightly different because the issue was with the arguments rather than the file name itself and a file with only ".png" extension could be written anywhere in the system.
   <mark><a target = "_blank" rel = "nofollow noopener noreferrer" href=" https://github.com/jasonraimondi/url-to-png/commit/8afc00247c1d7e6c7b37356a5f6282b486e596fa#diff-b6976c39b4e50125519d2e908fe8f3c24cece6d69f60a76b255bcac922a8de67R57">
   Commit:8afc00247c1d7e6c7b37356a5f6282b486e596fa</a></mark> introduced the issue.

2. **POC**: Here's the <a target = "_blank" rel = "nofollow noopener noreferrer" href="https://www.loom.com/share/bd7b306cdae7445c97e68f0626e743a6">Loom</a> video POC of me reproducing the issue.
3. **Fix**: The fix was to remove all the special characters and replace them with a single "-". We didn't go for a fancy fix because we already had a function to do this for us. Fixed in <mark><a target = "_blank" rel = "nofollow noopener noreferrer" href="https://github.com/jasonraimondi/url-to-png/commit/e4eaeca6493b21cd515b582fd6c0af09ede54507">Commit:e4eaeca6493b21cd515b582fd6c0af09ede54507</a></mark>

### 2. CVE-2024-XXXX

`Base Score:` 10.0 CRITICAL<br>
`Vector:` CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H<br>
`Stars`: 2.1k

(we don't have a CVE for this yet)

1. **Issue**: Path traversal occurred due to a lack of sanitization of user input for the file name. This issue sort of combined Unrestricted file upload vulnerability as well. I could upload any file, with any extension and content anywhere in the system.
   <mark><a target = "_blank" rel = "nofollow noopener noreferrer" href="https://github.com/miroslavpejic85/mirotalksfu/commit/8b81f0dd7e804859a776c51e09faec9e266af293#diff-4c734989f0bc8aa243e7010652fdbce84ec7ef54f2a7f5a598ece3fdf2f65812R455-R463">
   Commit:8b81f0dd7e804859a776c51e09faec9e266af293</a></mark> introduced the issue.

2. **POC**: Here's the <a target = "_blank" rel = "nofollow noopener noreferrer" href="https://www.loom.com/share/6fad860cc48949509d8b952e00b902c4?sid=6036b6f7-217e-4e1d-bbba-237062d69e48">Loom</a> of me reproducing the issue.
3. **Fix**: Two fixes went here.
   1. First the dev used simple `if` statement to check what the `fileName` started with and ended with. <mark><a target = "_blank" rel = "nofollow noopener noreferrer" href="https://github.com/miroslavpejic85/mirotalksfu/commit/760d01ca71cb1bbb85cef64a61c9784fab7965a0#diff-4c734989f0bc8aa243e7010652fdbce84ec7ef54f2a7f5a598ece3fdf2f65812R664">Commit:760d01ca71cb1bbb85cef64a61c9784fab7965a0</a></mark>. This isn't a foolproof fix and still leaves room for path traversal vulnerabilities. Additionally, the file upload vulnerability still exists.
   2. The second and final fix was to check if the file matched the exact naming pattern defined by the regex. This ensures that even if a file with a `.xyz` extension is uploaded, it is saved with a `.webm` extension, else rejected.
      <mark><a target = "_blank" rel = "nofollow noopener noreferrer" href="https://github.com/miroslavpejic85/mirotalksfu/commit/8414e4e108bc721d3ffbb48f87e95485b7650795">Commit:8414e4e108bc721d3ffbb48f87e95485b7650795</a></mark> which fixed the issue.

### 3. CVE-2024-43797

`Base Score:` 5.4 Medium<br>
`Vector:` CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:L<br>
`Stars`: 6.4k<br>

Quick Links: [NIST](https://nvd.nist.gov/vuln/detail/CVE-2024-43797), [POC](https://github.com/advplyr/audiobookshelf/security/advisories/GHSA-gg56-vj58-g5mc)

1. **Issue**: The web app allowed admins to store libraries, including various file types like .txt and .pdf, anywhere in the server's filesystem. However, this feature was intended only for admin users. We discovered an issue where non-admin users could exploit the endpoint to create arbitrary directories on the server. While not a traditional Path Traversal vulnerability, the impact was equivalent due to a Role-Based Access Control (RBAC) flaw. <mark>[Commit(s)](https://github.com/advplyr/audiobookshelf/blame/1c0d6e9c670ebb1b6f1e427a4c4d9250a7fb9b80/server/controllers/LibraryController.js#L43-L47) which introduced the issue
2. **POC**: Here's a [video POC](https://www.loom.com/share/58f28fa857e44807857f19987ef1d696) of us reproducing the issue.
3. **Fix**: The fix involved adding a check for the admin permissions in the code.<mark>[Commit:8774e6be718147759cf33412c896568f4eb892c2](https://github.com/advplyr/audiobookshelf/commit/8774e6be718147759cf33412c896568f4eb892c2#diff-be3115873d7a28337a5682906c03181181f94f7944877156f7279c75d00b9ccdR44-R46)</mark> which fixed the issue

### 4. CVE-2024-47769

`Base Score:` 7.5<br>
`Vector:` CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N<br>
`stars:` 6.3k<br>

Quick Links: (<a target = "_blank" rel = "nofollow noopener noreferrer" href="https://nvd.nist.gov/vuln/detail/CVE-2024-47769">NIST</a>, <a target = "_blank" rel = "nofollow noopener noreferrer" href="https://github.com/idurar/idurar-erp-crm/security/advisories/GHSA-948g-2vm7-mfv7">POC</a>)

1. **Issue**: The CRM application allowed unauthenticated users to browse files from the `/public` endpoint. Due to missing sanitization on the subPath variable, an attacker can exploit the endpoint to read any arbitrary file from the server. <mark><a target = "_blank" rel = "nofollow noopener noreferrer" href="https://github.com/idurar/idurar-erp-crm/commit/7b1d935c5b316ec3c6056e03b93d922c6d814c7b#diff-f092dc031d7bcdc910362d69bda59417e1344550011b9cf3b84bbb5760b8ebbcR1">
   Commit:7b1d935c5b316ec3c6056e03b93d922c6d814c7b
   </a></mark> introduced the issue.
2. **POC**: Here's the <a target = "_blank" rel = "nofollow noopener noreferrer" href="https://github.com/idurar/idurar-erp-crm/security/advisories/GHSA-948g-2vm7-mfv7">POC</a>) for the issue.
3. **Fix**: The fix commit involved adding a filter for the `subPath` variable<mark><a target = "_blank" rel = "nofollow noopener noreferrer" href="https://github.com/idurar/idurar-erp-crm/commit/0d623e1753a40442571954053de9fbb5072a8417">
   Commit:0d623e1753a40442571954053de9fbb5072a8417
   </a></mark>.

## Conclusion

Most of these issues arose from using unsanitized user input in the `path.join()` function, leading to security vulnerabilities. To mitigate these risks, developers should follow security best practices from [CISA](https://www.cisa.gov/resources-tools/resources/secure-design-alert-eliminating-directory-traversal-vulnerabilities-software) and [OWASP](https://owasp.org/www-community/attacks/Path_Traversal), including proper input validation and sanitization, to reduce vulnerabilities in their applications.

## Closing Remarks

We aimed to assess the advisory's severity by identifying and fixing issues independently, minimizing the burden on OSS developers. As security engineers, we recognize the need to improve our security reporting and remediation, given developers' limited incentives. **For each vulnerability found, we raised pull requests and asked developers to apply for CVEs**, ensuring we avoid exaggerating or creating unnecessary alarms for users, avoiding repeats [of similar situations](https://socket.dev/blog/node-ip-maintainer-restores-github-repo-after-archiving-due-to-overblown-cve-rating).

I hope you found this useful and educational. Thanks and Happy Hunting :)

--

END