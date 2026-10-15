# Setup and preflight

The local starter, both package-manager setup paths, all solution combinations,
browser interactions and print layouts have been checked. See
[validation](validation.md) for exact versions, evidence and the separate manual
Copilot/account checks to rehearse before delivery.

## What you need

Use a machine on which you may edit a local directory. Install Git, Node 24 LTS,
VS Code with GitHub Copilot access, GitHub Copilot CLI, and the GitHub Copilot
desktop app through your organization's approved installation process. Use npm
(included with Node) OR pnpm 10. You do not need both. No Docker, Python, database,
app API key, cloud subscription or build tooling is required.

Use the public clone URL below, or your facilitator's internal distribution URL.
Read permission is enough: remote permissions govern publishing, not editing
files you own locally.
An organization's Copilot entitlement and policy can still restrict agent use;
repository read access does not itself grant Copilot.

## Check installations in an ordinary terminal

Commands in `sh` fences go into your operating-system shell, not Copilot Chat:

```sh
git --version
node --version
npm --version
copilot --version
```

If choosing pnpm, also run `pnpm --version`; its major version should be 10.
Do not install pnpm just to satisfy an npm-only workstation. Node's major version
should be 24. Obtain missing tools from approved software distribution or the
official [Node download page](https://nodejs.org/en/download) and
[Copilot CLI installation instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli).
An existing Node version manager may read `.nvmrc`; do not change global runtime
settings in the middle of an unrelated project.

**Checkpoint:** each chosen tool reports a version. Record exact versions in your
notes; do not describe a target version as tested evidence.

## Clone and make a local practice branch

Clone the public starter, substituting an internal URL if your facilitator
provides one:

```sh
git clone https://github.com/alexsuglio/meijer-agentic-engineering-workshop.git freshcart-practice
cd freshcart-practice
git tag --list workshop-v1
git switch -c practice/local workshop-v1
```

A branch is a local line of work; `workshop-v1` is the fixed starter tag. If the
tag is missing, stop and ask the facilitator for the verified baseline commit.
Do not guess which revision is the starter. This command creates a local branch
only; it does not create a remote branch. If `practice/local` already exists,
use a new name, for example `practice/local-2`, rather than deleting old work.

**Checkpoint:** `git status --short` is empty and `git branch --show-current`
reports your practice branch.

## Install and run the one-command preflight

Choose ONE column:

| Purpose | npm | pnpm |
|---|---|---|
| Reproducible install | `npm ci` | `pnpm install --frozen-lockfile` |
| Environment preflight | `npm run setup:check` | `pnpm run setup:check` |
| Existing-behavior tests | `npm test` | `pnpm test` |
| Start server | `npm start` | `pnpm start` |

`setup:check` checks Node, Git, the invoking package manager and essential files.
It deliberately does not require the other package manager, authenticate Copilot,
or claim to inspect the browser. If a lockfile is incompatible in a future
revision, the maintainer must regenerate and validate it before distribution; a
participant should not improvise lockfile repairs during the session.

**Checkpoint:** preflight and baseline tests succeed. The server prints the
absolute checkout path and `http://127.0.0.1:3000`. Compare that path to your editor.

## Open the application

Open **http://127.0.0.1:3000** in a modern browser. Do not double-click
`public/index.html`: JavaScript modules need HTTP serving. Leave the server
terminal running and open a second terminal in the same repository.

You should see 24 products, granola quantity 2 with a $3.49 total, and order
FC-1042 with unavailable OAT-001. Search `oat`; clear search; choose Produce.
The stock badges initially say **Not classified**; stock filters other than
All stock have not been implemented. That is Lab 1, not a setup failure.

**Checkpoint:** search and department filtering work, the basket changes, and
manual replacement can change the pickup item. Click **Reset demo data**, confirm,
and return to the seed state before beginning.

## Manual Copilot checks: separate from app checks

In VS Code, open this folder with **File > Open Folder**, then open the Chat view.
Sign in through the GitHub account UI if asked. In a second terminal, run
`copilot` from the repository; use `/login` if the client requests authentication.
In the desktop app, sign in, click **+** next to **Projects** in the sidebar, and
choose this clone's folder. In the dropdown under the prompt box select **your
local repository**, not a new working tree or cloud sandbox. Select **Plan**
from the mode dropdown below the prompt field for the read-only check.

In each client, paste:

```text
Read README.md and docs/business-rules.md without editing anything.
Report the absolute repository path, the three lab target files, and which
checks you can run. Do not commit, publish, push or start cloud work.
```

Check the actual paths in the answer, not just its confidence. Review each tool
permission request; repository editing and command execution are separate from
sign-in. An unavailable permission prompt is a blocker, not permission to bypass
the tool. If one client is unavailable, pair with a neighbor or observe that lab;
do not report the client as verified. The app itself can run without Copilot.

**Checkpoint:** all three required clients can read your local clone and are
authorized for the intended local edits/checks. Auth, organizational policies,
model availability and cloud-agent eligibility are manual checks.

## When setup fails

Use [troubleshooting](troubleshooting.md). Never disable TLS verification to make
an installation work. A corporate proxy or certificate problem belongs with the
approved network setup, not `strict-ssl=false`. Keep an offline copy of these
docs, but remember Copilot model access may require network connectivity.
