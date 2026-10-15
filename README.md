# FreshCart Ops

A grocery pickup desk for practicing agentic engineering: give an assistant a
bounded task, inspect its changes, and demand evidence. This is not a task counter.
Browse 24 synthetic products, inspect stock reservations, edit a basket and
replace an unavailable pickup item. No orders, payments or data leave the app.

The application uses JavaScript modules, HTML/CSS, Node's HTTP server and Node's
test runner. There are no application dependencies, external APIs, build step,
database service or paid application integrations. Copilot access itself is a
separate participant prerequisite.

## Start here

Already in a local clone? With Node 24 installed:

```sh
npm ci
npm start
```

Or use `pnpm install --frozen-lockfile` and `pnpm start` with pnpm 10.
Open **http://127.0.0.1:3000**. No build step or additional service is needed.

Read [setup](docs/setup.md), then follow the [participant guide](docs/participant-guide.md).
Clone the public workshop below, or substitute your facilitator's internal
read-only distribution URL if one is provided:

```sh
git clone https://github.com/alexsuglio/meijer-agentic-engineering-workshop.git freshcart-practice
cd freshcart-practice
git switch -c practice/local workshop-v1
npm ci
npm run setup:check
npm test
npm start
```

With pnpm, replace the final four commands with:

```sh
pnpm install --frozen-lockfile
pnpm run setup:check
pnpm test
pnpm start
```

Open **http://127.0.0.1:3000**. Keep that terminal open; use another terminal for
Copilot and checks. Ctrl+C stops this server. Node 24 LTS is the target runtime;
npm users do not need pnpm. [Validation evidence](docs/validation.md) records
Node 24.14.1, npm 11.11.0, pnpm 10.34.6 and the actual browser/check results.

## Deliberately unfinished, not broken setup

| Lab | Surface | Starter gap | Visible outcome |
|---|---|---|---|
| [1](docs/lab-1-vscode.md) | VS Code | Stock classification | Correct badges and stock filters |
| [2](docs/lab-2-cli.md) | Copilot CLI | Odd BOGO quantities | 3 granolas at 349 cents total 698 cents |
| [3](docs/lab-3-app.md) | Copilot desktop app | Suggestions and candidate UI | Explained options and explicit replacement |

`npm test` / `pnpm test` covers existing behavior and is green on
the starter. Acceptance tests intentionally expose the missing behavior:
`npm run test:lab1`, `npm run test:lab2`, `npm run test:lab3` (or `pnpm run ...`).
The labs do not depend on one another. Do not make all acceptance tests green
before the workshop. Keep solutions in `solutions/`, not active starter modules.

## Learn, replay, facilitate

- [Business rules](docs/business-rules.md): exact domain contract and edge cases.
- [Customization](docs/customization.md): instructions, skills and reviewer agent.
- [Solutions and backups](docs/solutions.md): explicit, narrow local application.
- [Rehearsal](docs/rehearsal.md): repeat practice without permanently fixing main.
- [Facilitator script](docs/facilitator-guide.md): complete two-hour run of show.
- [Presenter companion](docs/presenter-companion.md): speaking notes, agent roles and live-demo cues.
- [Troubleshooting](docs/troubleshooting.md): setup, tests, clients and recovery.
- [Print reference](docs/quick-reference.html): designed for one A4 or Letter page.
- [Presenter cloud demo](docs/presenter-cloud-demo.md): optional owner-only `/delegate`.
- [Distribution](docs/distribution.md): publish a future internal read-only copy.
- [Validation](docs/validation.md): release gates and unverified checks.
- [Product sources](docs/product-sources.md): documented Copilot behavior.

Participants work in their own editable local clones even when remote access is
read-only. No push, issue, pull request (PR), cloud session or remote write is
needed. The presenter may separately delegate the SAME pricing task to their own
writable GitHub repository; that PR remains unmerged so main stays the starter.

This is a fictional store and synthetic dataset, not Meijer production software.
Dietary and allergen fields are exercise metadata, not medical or dietary advice.
