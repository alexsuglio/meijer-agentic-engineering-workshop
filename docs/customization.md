# Repository customization

Customization supplies reusable context, not permission to ignore the operator.
The workshop does not need an MCP server. MCP (Model Context Protocol) connects
an agent to external tools/data; discuss it as an optional extension, but do not
add mandatory network configuration, credentials or services.

## What each file does

| Mechanism | Repository path | Purpose |
|---|---|---|
| Repository instructions | `.github/copilot-instructions.md` | Shared boundaries, commands and rules |
| Path-specific instructions | `.github/instructions/*.instructions.md` | Domain, UI and test guidance selected by `applyTo` |
| Skills | `.github/skills/<name>/SKILL.md` | Reusable task-specific procedures and evidence |
| Custom agent | `.github/agents/grocery-rules-reviewer.agent.md` | Focused rules audit with explicit tools |
| Optional prompt file | `.github/prompts/review-grocery-change.prompt.md` | VS Code-only saved prompt shortcut |

Instructions and skills do not automatically grant execution or editing
permission. Prompt files are not promised as CLI-discoverable commands. In VS
Code use the prompt picker to select `review-grocery-change` if supported by your
installed version; the lab's pasted prompt remains the portable route.

## Inspect the loaded context

In Copilot CLI, run `/skills list`, `/skills info pricing-regression` or
`/skills info substitution-check`. After a file change, use `/skills reload`.
Use `/agent` to choose the grocery rules reviewer. In the desktop app use its
agent picker or `/agent`. If the name is missing, confirm the checkout and file
path, refresh/reopen the session, and inspect the actual profile. Explicitly
reading a skill file is a fallback; report discovery as unverified in that case.

In any client, ask:

```text
Which repository instructions and skills are available for this task?
Read the named files if needed. Report paths, not assumptions. Do not edit.
```

## Why the reviewer is substantive

It reads the business contract and current diff, maps changes to relevant
commands, and produces file/rule/expected/actual/pass-fail evidence. It must not
claim a browser pass from a helper test, or declare other labs fixed.

Its tools are explicitly `read`, `search`, `execute`; omitted tools would permit
all tools according to the configuration reference. Execute can mutate files
through programs, so "review only" is an instruction policy, not a sandbox.
Review tool requests and only approve commands you understand. A read-only review
does not require solution application, commits, cloud sessions or network writes.

## Permission controls are distinct from execution modes

Plan/Interactive/Autopilot govern how the client works. They do not automatically
resolve every denied tool. The desktop app's `/autopilot` mode control is distinct
from `/allow-all-tools` (or `/yolo`) tool auto-approval. This workshop defaults to
manual per-tool approval. Broad auto-approval is an optional, conscious user
decision for trusted code only; it is not a workshop command to copy, and no
agent should enable it to get around an explicit denial.

See [product sources](product-sources.md) for current documented behavior.
