<!--
  README for OpenCommit.
  This file explains the immutable philosophy and setup steps in plain language.
-->
# OpenCommit

OpenCommit is an immutable public commit platform where accountability is permanent. Once a commit is created, it can never be edited or deleted — only new commits can be appended. This makes the timeline auditable and trustworthy.

## Why commits are immutable

Every commit includes a SHA-256 hash generated from:

- `content`
- `createdAt`
- `previousCommitHash`

This creates a hash chain. If someone changes any old commit, the hash changes and the chain breaks. The UI shows the hash so the public can verify consistency.

## Appwrite rules that enforce immutability

Appwrite rules must enforce append-only behavior:

- ✅ **CREATE** allowed for authenticated users
- ✅ **READ** allowed for everyone
- ❌ **UPDATE** disabled
- ❌ **DELETE** disabled

These rules guarantee that once a commit document exists it cannot be altered or removed.

## Database schema

Collection: `commits`

Fields:

- `authorId` (string)
- `authorName` (string)
- `authorAvatar` (string)
- `authorBio` (string)
- `authorHeadline` (string)
- `authorLocation` (string)
- `authorSocials` (string[])
- `verified` (boolean)
- `content` (string)
- `tag` (string)
- `createdAt` (datetime)
- `previousCommitHash` (string | null)
- `commitHash` (string)

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file using the template below:

```bash
cp .env.example .env
```

3. Start the dev server:

```bash
npm run dev
```

## Deployment (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Add the same environment variables from `.env.example`

## Important production note

For strict immutability, generate `createdAt` and `commitHash` on the server (for example via an Appwrite Function) so the timestamp cannot be client-manipulated. The frontend expects Appwrite rules to prohibit edits and deletions so the chain remains append-only.
