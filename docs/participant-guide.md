# Participant guide

Read [setup](setup.md) first. Keep the same local clone open across all three
surfaces: VS Code, Copilot CLI, then the Copilot desktop app. Keep one server
terminal and one command/CLI terminal. Never run this workshop in a customer or
production repository.

## Vocabulary

An **agent** can inspect files, edit code and run tools, subject to your
permissions. A **prompt** is your written task. **Context** is the files and
instructions it reads. A **diff** shows changed lines. A **regression** is a bug
that returns after a change. An **acceptance test** specifies the new behavior;
baseline tests cover existing behavior. A **SKU** is one product identifier.
**BOGO** means buy one, get one free, within the same SKU. A **worktree** is a
separate checkout; this workshop uses your existing local clone so the browser
and agent point at the same files. A **PR** is a remote pull request, not required
for participant work.

## The two-hour route

| Elapsed minutes | Activity |
|---|---|
| 0-15 | Setup, safety boundary, starter walkthrough |
| 15-45 | [Lab 1: VS Code stock clarity](lab-1-vscode.md) |
| 45-75 | [Lab 2: CLI pricing regression](lab-2-cli.md) |
| 75-80 | Break |
| 80-110 | [Lab 3: desktop app substitutions](lab-3-app.md) |
| 110-120 | Review evidence, replay strategy, wrap-up |

Each lab allocates 5 minutes to frame the problem, 10 to a demonstration, and 15
to your own practice. Each includes one optional stretch only after the core
acceptance check is green.

## Your operating loop

Inspect the current behavior. Give a bounded prompt with business rules. Review
the proposed scope. Allow only the necessary local actions. Read the diff. Run
the named checks yourself. Exercise the visible browser behavior. Record
expected versus actual evidence, including failures.

Use `npm run <script>` or `pnpm run <script>` for named scripts. `npm test` and
`pnpm test` are equivalent here. Commands such as `/skills list` and `/agent`
belong inside Copilot, not your shell; `copilot` itself is a shell command.
Do not paste the surrounding Markdown fence marks into either surface.

## Keep the starter reusable

The original main branch and `workshop-v1` remain unfinished. Your local practice
branch can contain solutions without affecting the remote. No push, PR, issue,
cloud session or remote-write permission is required. The presenter may
separately demonstrate `/delegate` in their own writable repository; observe
that segment, do not run it in the participant clone.

**Reset demo data** resets only this browser origin's basket and pickup order.
It does not undo code. To practice again, follow [rehearsal](rehearsal.md) and make
a fresh clone or a new local branch from the starter tag after preserving work.
Stop the old server first. Do not delete, reset, stash or overwrite prior work.

## Checkpoints and help

Each numbered lab step includes a paste-ready prompt and a concrete checkpoint.
If a checkpoint fails, capture the command, expected result, actual result and
file diff. Use [troubleshooting](troubleshooting.md), then ask the facilitator.
Reference solutions are explicit opt-ins, not automatic shortcuts; preview the
exact file replacement and backup behavior in [solutions](solutions.md).

The custom reviewer can provide evidence, not permission to skip your own review.
Tests do not prove dietary safety or production readiness. Everything here is
synthetic, local and deliberately small.
