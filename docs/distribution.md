# Maintainer distribution guide

The public presenter repository is
[alexsuglio/meijer-agentic-engineering-workshop](https://github.com/alexsuglio/meijer-agentic-engineering-workshop).
This guide covers a future, separately authorized internal distribution.
Do not run remote-write steps as part of participant practice.

## Release gate before import

Complete [validation](validation.md), including genuine lock generation, clean
installs, all eight combinations, real browser behavior, recovery and printing.
Keep active source unfinished; complete implementations stay in `solutions/`.
Record exact runtime/package-manager/client versions and unresolved product-only
checks. A green baseline without those checks is not a verified starter release.

## File-tree import versus Git/hosted metadata

An import of source files copies files, not Git history/tags or hosted issues,
PRs, permissions, discussions, branch protections, Actions secrets or policies.
Do not assume `workshop-v1` transfers. If using a different Git import mechanism,
inspect its actual refs and permissions rather than assuming the result.
Dummy issues/PRs are deliberately deferred; participants do not need them.

Place the verified tree in a new approved internal repository or import it through
your organization's normal process. Do not copy private data from another
workshop. These files are original synthetic examples inspired by a simple setup,
not a copy of a task-counter application.

For a new local file-tree import with no Git history, an authorized maintainer
can establish the baseline with:

```sh
git init -b main
git status --short
git add .
git diff --cached --stat
git commit -m "Add verified FreshCart Ops starter workshop"
git tag --list workshop-v1
```

Inspect staged contents before committing; do not include secrets, backups,
node_modules or completed active lab files. If `workshop-v1` does not exist,
create it only on the validated starter commit:

```sh
git tag -a workshop-v1 -m "Verified unfinished FreshCart workshop starter"
```

If the tag already exists, inspect it and STOP rather than force-moving it.
Use a new release tag if a later release is required. Follow any local tool's
required commit trailers when it performs a commit.

## Future internal publication

Only a maintainer with explicit publication authorization performs:

```sh
git remote add origin "<INTERNAL_DISTRIBUTION_URL>"
git push -u origin main
git push origin workshop-v1
```

If a remote already exists, inspect it with `git remote -v`; do not silently
replace its URL. Remote permissions, visibility and branch rules are configured
by the organization through its approved process, not by workshop agents.

Set the README/setup placeholder to the future internal URL in participant
communication, or supply that URL as a separate workshop handout. Keep a clean,
verified `workshop-v1` tag in the internal repository and make it readable to
attendees. Participant access can remain read-only; no participant PR/issue/cloud
write entitlement is needed.

## Verify the distribution as an attendee

Use a clean clone with read-only access, execute the setup guide, and confirm the
tag, baseline tests, seed UI and three intentional acceptance failures. Confirm
all documentation links are available internally and Git history does not
contain secrets. A file download may omit `.github` or Git metadata if assembled
incorrectly; preserve customization files in your distribution.

Do not enable auto-merge or merge a cloud demonstration PR into the starter.
Keep presenter-owned cloud demos distinct from the internal participant copy.
