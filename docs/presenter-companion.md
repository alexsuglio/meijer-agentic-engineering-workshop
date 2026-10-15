# FreshCart Ops: presenter companion

Keep this open beside the demo. Use the tables for quick cues and the quoted
lines as speaker notes. This is a presenter aid, not another participant lab.
The results below are **expected demo outcomes**, not a record of checks run.

**Jump to:** [Agent vocabulary](#which-agents-am-i-actually-using) |
[VS Code](#scenario-1-vs-code-stock-clarity) |
[CLI](#scenario-2-copilot-cli-bogo-regression) |
[Desktop app](#scenario-3-desktop-app-explained-substitutions) |
[Optional cloud](#optional-presenter-demo-the-same-task-in-the-cloud) |
[Presentation guardrails](#before-presenting-and-between-scenarios)

## The story in one minute

> "We have a working grocery pickup demo with three deliberately unfinished
> behaviors. First, we make stock status useful. Second, we fix a pricing bug.
> Third, we build a complete replacement-suggestion feature.
>
> I'm using coding agents to investigate, change code, and check results. I'm
> still responsible for the rules, the scope, permissions, and accepting the
> result. We are adding no AI service to the grocery application itself."

| When | Scenario and visible problem | Agent setup to explain | Expected finish |
|---|---|---|---|
| 00-15 | Setup and framing | Repository context, local tools, human approval | Working unfinished starter |
| 15-45 | VS Code: stock numbers exist, useful statuses do not | Standard coding agent in Agent mode | Correct badges and stock filters |
| 45-75 | CLI: three BOGO granolas charge for only one | Standard agent + `pricing-regression`, then `grocery-rules-reviewer` | Three granolas cost $6.98 |
| 75-80 | Break | Stop overlapping edits before switching clients | Preserve the same local work |
| 80-110 | Desktop app: no automatic replacement suggestions | Standard agent in Plan then Interactive; `substitution-check`; reviewer | Explained choices and explicit replacement |
| 110-120 | Evidence and wrap | Human acceptance of agent-produced work | One before/after example per lab |

Each lab has 5 minutes of framing, 10 of demonstration, and 15 of practice.
Cloud delegation is optional inside the CLI segment, not an extra required lab.
Skip stretches before sacrificing participant practice.

## Which agents am I actually using?

### 1. The standard coding agent: my implementation partner

In VS Code, select **Agent** in Chat. In CLI, start a normal `copilot` session.
In the desktop app, use the standard agent and choose the session mode.
These are different clients for agentic coding work, not three repository-defined
specialists called "stock agent," "pricing agent," and "substitution agent."

The agent can inspect files, trace callers, propose and apply edits, execute
approved commands, and use their results to revise its approach. That tool loop
is the difference from merely requesting a code snippet.

> "I give the agent the problem and constraints. It works through the code and
> tools, rather than just telling me what I could type."

We carry the **same files** between clients. Do not imply that conversation
history or context automatically transfers; orient each new session explicitly.

Source: [VS Code tool workflow](https://code.visualstudio.com/docs/agents/run/tools)
and [desktop sessions and modes](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions).

### 2. `grocery-rules-reviewer`: my configured review specialist

This is the workshop's named custom agent. Show its actual profile:
[`.github/agents/grocery-rules-reviewer.agent.md`](../.github/agents/grocery-rules-reviewer.agent.md).

| What is configured | What I should explain |
|---|---|
| Role | Audit the actual diff against the grocery business rules |
| Tools | `read`, `search`, `execute`: inspect files and run relevant checks |
| No-edit instruction | Review rather than implement; preserve other local work |
| Verification procedure | Use `verify-grocery-change` plus the relevant domain skill |
| Output contract | File/rule, expected behavior, actual evidence, pass/fail/blocked |
| Model | The profile does not pin one; do not promise a different model |

> "Now I'm changing the assignment from 'make the change' to 'audit the change.'
> This reviewer has a reusable role, a tool list, and an evidence format.
> 'Looks good' is not its acceptance criterion."

Select it with `/agent` in CLI or the desktop app's supported agent picker.
The scripted workshop uses an explicit role switch, not a parallel agent swarm.
A review role is not proof of independence or correctness: inspect its evidence.
It is also not GitHub's hosted pull-request review feature.

**Important:** `execute` can run programs that modify files. The profile's
no-edit instruction is a policy, not a technical read-only sandbox.
Continue inspecting tool requests.

Source: [Invoking custom agents](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
and [custom agent configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration).

### 3. The optional cloud agent: my remote implementation worker

For the presenter-only extension, `/delegate` sends the pricing task from CLI
to Copilot cloud agent on GitHub. This is a separate remote execution, with a
branch, draft PR, and session links; it is not simply a local mode switch.
Participants do not need it.

Source: [Delegating tasks to Copilot](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca).

### Skills, instructions, modes, and models are different things

| Term | Plain-language explanation | This workshop's example |
|---|---|---|
| Agent | The actor doing the work using tools | Standard agent or `grocery-rules-reviewer` |
| Skill | A reusable task procedure the agent loads; not another worker | `pricing-regression` |
| Repository instructions | Shared guidance and constraints | Synthetic data, integer cents, preserve unrelated labs |
| Path-specific instructions | Guidance for the kind of file being changed | Domain, UI, and test instructions |
| Mode | How the session proceeds | Plan first, then Interactive implementation |
| Model | The underlying model used by the agent | Show the actual client selection; no model comparison is required |
| Tool | A concrete capability subject to permissions | Read a file, edit it, run a test |

The three repository skills are:

| Skill and source | What it contributes | Where I emphasize it |
|---|---|---|
| [`pricing-regression`](../.github/skills/pricing-regression/SKILL.md) | Reproduce the BOGO defect; cover quantities, SKU separation, invalid inputs, and overflow | CLI lab |
| [`substitution-check`](../.github/skills/substitution-check/SKILL.md) | Check hard eligibility gates, ranking, explanations, and the explicit replacement path | Desktop lab |
| [`verify-grocery-change`](../.github/skills/verify-grocery-change/SKILL.md) | Map the changed lab to checks and distinguish tests from browser evidence | Shared verification, especially the reviewer |

> "The agent is the worker. The skill is the procedure. The instructions are the
> shared rules. The tools let it act. I still decide whether the result is good."

These skills currently provide written procedures, not separate running agents.
Show `/skills list` and `/skills info pricing-regression` in CLI. If discovery
fails, read the exact file and disclose that fallback; do not claim it loaded
automatically. The optional VS Code
[`review-grocery-change` prompt](../.github/prompts/review-grocery-change.prompt.md)
is a saved prompt targeting the reviewer, not an additional agent or a portable
CLI command.

Source: [About agent skills](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/about-agent-skills)
and [CLI skills and instructions](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-cli/customize-copilot/add-skills).

## Scenario 1: VS Code stock clarity

**Business problem:** The pickup desk can see stock numbers but cannot reliably
filter for items needing attention. The classifier is unfinished; the underlying
stock arithmetic is already correct.

**Before:** BAN-001 has 10 on hand, 8 reserved, and 2 available, but its badge
says **Not classified**. Low stock filtering is empty on the starter.

**After:** With a reorder threshold of 3, those 2 available units mean **Low
stock**. Badge and filter agree because they use the same classifier.

### Explain the agent's assignment

> "I'm using the standard agent in VS Code, not a custom inventory agent.
> First I want it to locate the missing behavior. Then I authorize a small
> implementation. I do not want it to rewrite the stock math or solve other labs."

The agent's context is [the business rules](business-rules.md), `src/stock.js`,
`src/availability.js`, the catalog caller, and the acceptance tests.
No named specialist is required for this first lab. The general verification
skill is available, but the core lesson is bounded investigation and editing.

### What I do on screen

1. Search for BAN-001 in the browser, show the numbers and badge, then choose
   Low stock. Ask the room what label 2 available units should produce.
2. Open the same folder in VS Code. Select Agent and use
   [Lab 1's inspection prompt](lab-1-vscode.md#1-observe-before-requesting-an-edit).
   Ask for an explanation before an edit.
3. Run `npm run test:lab1`. Point out the intended assertion failure:
   `unclassified` is not the required stock status.
4. Give the implementation prompt below. Approve only the needed local actions.
5. Inspect the diff, run the baseline and Lab 1 checks, and refresh the browser.

**Implementation prompt:**

```text
Implement Lab 1 in src/availability.js. Use the existing availableQuantity
helper. Return out/Out of stock at zero first, low/Low stock for positive
availability <= reorderThreshold, otherwise in/In stock. Keep the existing
object shape and filter API, including attention matching low OR out.
Preserve invalid-input errors, search and department filtering.
Change no other lab. Run the baseline and Lab 1 tests.
Do not commit, push, publish, create a PR or apply a reference solution.
```

### What I point to in the result

| Evidence | Expected |
|---|---|
| Zero stock | Out of stock, even if the threshold is zero |
| Threshold equality | Positive availability equal to the threshold is Low stock |
| Low stock filter | BAN-001, SPIN-001, BERRY-001 |
| Out of stock filter | OAT-001, AVO-001 |
| Needs attention | All five low/out products, not the other 19 |
| Combined filters | All stock + Produce + search `banana` yields Banana bunch |

Run `npm test` and `npm run test:lab1`. A passing function test does not prove
that I refreshed the correct browser or exercised the filters.

**Close with:** "The useful work was identifying the right seam and preserving
working behavior, not generating a large amount of code."

**Transition:** "Next, the app looks plausible and the baseline is green, but a
specific pricing example proves it is wrong."

Full prompts and checkpoints: [Lab 1](lab-1-vscode.md).

## Scenario 2: Copilot CLI BOGO regression

**Business problem:** Odd BOGO quantities undercharge. The leftover unpaired unit
is incorrectly free because the starter rounds charged units down.

**Before:** Three Crunchy granolas at 349 cents each cost **$3.49**.
**After:** They cost **$6.98**: buy one, get one free, then pay for the third.

### Explain the two roles and the skill

> "The standard CLI agent is my debugger and implementer. The pricing-regression
> skill gives it a repeatable investigation checklist. After the fix, I select
> grocery-rules-reviewer to audit the actual diff against that checklist."

The skill is not a "pricing agent." It tells the current agent to establish a
failing example, inspect quantities 0-5, preserve standard pricing, and check
separate SKUs and invalid inputs. The custom reviewer changes the responsibility
and reporting contract; it does not magically guarantee a correct answer.

### What I do on screen

1. Set granola quantity to 3 and leave the field. Ask the audience to calculate
   the expected total before showing the code.
2. Start `copilot` in a second terminal at the same clone root. Show
   `/skills list` and `/skills info pricing-regression`. Confirm the checkout
   and explicitly preserve Lab 1 changes.
3. Use the reproduction prompt below and inspect the actual odd-quantity failure.
   Explain that the baseline covered even quantities, so green did not mean complete.
4. Give the fix prompt. Inspect the changed charged-unit calculation, not just
   the agent's summary. It must not change seed prices or weaken expected totals.
5. Select `grocery-rules-reviewer` with `/agent` and use
   [the Lab 2 audit prompt](lab-2-cli.md#4-review-the-actual-diff-with-a-custom-agent).
6. Independently inspect the checks and browser totals. Stop CLI edits before
   opening the desktop app on the same files.

**Reproduction prompt:**

```text
Use the pricing-regression skill to reproduce the 3 x 349-cent BOGO defect.
Read actual test output and compare q=0,1,2,3,4,5. Explain which missing
regression let the baseline stay green. Do not fix code or alter assertions yet.
```

**Fix prompt:**

```text
Fix only the BOGO odd-quantity bug in src/pricing.js. Charge ceil(q/2) units
within each SKU, so q3 at349 totals698 cents. Preserve standard pricing,
q0/q1 behavior, integer validation, overflow errors and one line per SKU.
Do not mix SKU pairs. Run baseline and Lab 2 acceptance checks. Do not edit
other labs, copy solutions, commit, push or call /delegate.
```

### What I point to in the result

| BOGO quantity at $3.49 | Expected line total |
|---|---|
| 0 | $0.00 |
| 1 or 2 | $3.49 |
| 3 or 4 | $6.98 |
| 5 | $10.47 |

One bagel plus one granola, each a different BOGO SKU priced at $3.49, costs
**$6.98 combined**. They do not form a free pair. Ordinary non-BOGO pricing,
integer validation, and overflow errors must remain intact.

Run `npm test` and `npm run test:lab2`. Ask the reviewer for file/rule/expected/
actual/pass-fail evidence, not just an approval paragraph.

**Close with:** "I did not ask AI to invent the pricing policy. I supplied a
precise rule, reproduced a failure, and used a specialized review role to
challenge the fix."

**Transition:** "We have repaired one small calculation. Now we will deliver a
feature that must work all the way from business rules to a person's click."

Full prompts and checkpoints: [Lab 2](lab-2-cli.md).

## Scenario 3: desktop app explained substitutions

**Business problem:** A pickup order contains an unavailable oat drink.
Manual replacement already works, but the app cannot generate explained,
rule-based suggestions or provide candidate-specific Replace buttons.

**Before:** Find suitable replacements shows an explicit not-implemented message.
**After:** The app offers up to three eligible, ordered choices with explanations.
Nothing changes until the operator clicks a replacement.

### Explain the agent, modes, and reviewer

> "I start with the standard agent in Plan mode because this task spans logic
> and UI. The substitution-check skill helps enumerate the constraints. Once I
> accept the plan, I move to Interactive for implementation. Then the same
> grocery-rules-reviewer profile audits the complete change."

**Plan and Interactive are modes, not two separately authored custom agents.**
The job has expanded from a small function change to a complete user-facing
feature, so I make the integration path explicit before authorizing edits.

The reviewer uses `verify-grocery-change` for evidence discipline and
`substitution-check` for domain-specific cases. It must examine both the pure
helper and the rendered actions.

### What I do on screen

1. Stop other active agent edits. Choose the existing local repository in the
   desktop app, not a new worktree or cloud sandbox. Compare its path with the
   server's printed absolute path.
2. Reset demo data and request suggestions. Show the not-implemented message.
   Demonstrate manual replacement, then reset again to the original order.
3. Choose Plan and use
   [Lab 3's inspection prompt](lab-3-app.md#1-select-the-same-local-repository).
   The plan must name both `src/substitutions.js` and
   `public/substitution-panel.js`, plus the existing replacement callback.
4. Ask for the hard-gate explanation below. Discuss why "similar product" is
   insufficient: every required gate must pass.
5. Choose Interactive and give the implementation prompt. Inspect both files.
6. Run the checks and request an audit with the
   [Lab 3 reviewer prompt](lab-3-app.md#4-inspect-evidence-and-interact-with-the-result).
   Then demonstrate the actual click, reload, and reset in the browser.

**Constraint discussion prompt:**

```text
Use .github/skills/substitution-check/SKILL.md to enumerate the hard gates for
OAT-001, quantity2, vegan and gluten-free, excluding milk/soy/tree-nuts.
Explain why OAT-003, OAT-002 and OAT-004 should rank first, and why soy, almond,
whole milk, reserve oat and travel oat fail. No code changes yet.
```

**Implementation prompt:**

```text
Implement Lab 3's pure deterministic helper AND its wired candidate UI.
Require different SKU, exact category/package size/unit, available quantity
>= requested quantity, every required tag, no excluded allergen and known
metadata. Cap list price at120% of original using integer arithmetic.
Rank absolute price delta then SKU; return max3 with rule explanations.
Render explicit Replace buttons through the existing callback and a clear
no-match state that clears stale buttons. Never replace automatically.
Keep manual replacement, originalSku, persistence and other labs unchanged.
Use the business rules and acceptance tests; do not read/copy solutions/.
Run baseline and Lab 3 tests. No commit, push, PR or cloud session.
```

### What I point to in the result

| Rule or interaction | Expected |
|---|---|
| Eligibility | Different SKU, identical category/package size/unit, enough reservation-aware stock, all required tags, no excluded allergens, known metadata |
| Price boundary | At original 349 cents, candidate 418 passes; 419 fails |
| Ranking | Absolute list-price difference, then SKU; maximum three |
| Seed candidates | OAT-003, OAT-002, OAT-004, in that order |
| Reasons | Explain category/package, stock, tags, exclusions, and price |
| Before a click | Order remains OAT-001 |
| Click Barista oat drink | Order changes to OAT-003 with visible confirmation |
| Reload, then reset | Replacement persists on reload; reset restores OAT-001 |
| No match | Clear message, no stale Replace buttons, no order change |

Run `npm test` and `npm run test:lab3`. Distinguish helper tests, DOM-fixture
tests, and real-browser observation. A helper returning the correct array is
not proof that a usable button saves the replacement.

**Important language:** These tags and allergen fields are synthetic exercise
metadata, not a dietary-safety guarantee. The finished app uses deterministic
JavaScript rules, not an AI model to choose groceries.

**Close with:** "A suggestion is not an action. We used the agent to build a
complete feature, but the operator still makes the replacement decision."

Full prompts and checkpoints: [Lab 3](lab-3-app.md).

## Optional presenter demo: the same task in the cloud

**Purpose:** Compare local interactive implementation with remote asynchronous
delegation. Do not introduce a different business problem.

> "So far the agent has worked in my local checkout. Now I can delegate the
> same pricing task to Copilot cloud agent on GitHub. The execution location
> and delivery mechanism change; the business rules and evidence do not."

Use only the separately prepared, authorized, clean presenter-owned repository.
This requires writable remote access and eligible account/organization settings.
It is not part of the participant workflow.

1. Follow the [presenter cloud guide](presenter-cloud-demo.md) and explicitly
   decide whether to launch. Use its exact `/delegate` pricing prompt.
2. Explain that the handoff targets `src/pricing.js` and uses
   `pricing-regression`; it does not request all three labs.
3. Show actual returned branch, draft-PR, and agent-session links. If still
   running, say so. Inspect the diff and check output when available.
4. Leave the PR **unmerged**, with no auto-merge or Agent merge enabled.
   Return to participant practice without waiting indefinitely.

The cloud guide does not require selecting `grocery-rules-reviewer` remotely.
Do not claim a custom cloud reviewer ran unless it actually did.
If cloud execution is unavailable, explain the documented handoff or identify a
previous demonstration honestly; do not present it as live execution.

## Before presenting and between scenarios

- **Rehearse the clients:** [Recorded validation](validation.md) distinguishes
  local app evidence from authenticated client workflows and cloud delegation,
  which were not recorded as rehearsed/launched. Documentation is not proof
  that the installed picker, sign-in, or entitlement works.
- **Confirm the right files:** Node 24 is the target. Use the
  [setup guide](setup.md), keep the server in its own terminal, and compare
  checkout paths at every client handoff. Never silently switch worktrees.
- **Keep context explicit:** State the selected lab, show the defect, name the
  permitted files, and preserve prior local changes. Stop one editing session
  before another takes over.
- **Keep approval separate from mode:** Review local tool requests. Do not
  enable broad auto-approval or work around a denial to keep the demo moving.
- **Protect the starter:** No participant pushes, PRs, cloud sessions, or commits
  are needed. Do not copy reference solutions unless choosing explicit recovery.
  Labs are independent; never ask an agent to make every acceptance suite pass.
- **Reset the right thing:** Reset demo data restores browser basket/order state,
  not unfinished source. Use [rehearsal instructions](rehearsal.md) for replay
  without discarding work.
- **Use one package manager:** Commands here use npm. The equivalent checks are
  `pnpm test` and `pnpm run test:lab1`, `test:lab2`, or `test:lab3`.
- **Do not overclaim:** A failed assertion can be the intended starter gap.
  Missing modules, tool denials, or syntax errors are different problems.
  Only report commands and browser actions that actually ran.

## Answers I can give without overexplaining

| Audience question | Short answer |
|---|---|
| "How many custom agents did you build?" | One named reviewer. The other local implementation work uses the standard agent; the cloud demo is optional. |
| "Is a skill another agent?" | No. It is a reusable procedure available to the agent doing the work. |
| "Is Plan a separate planner agent?" | In this lab, Plan is a session mode. We are not authoring another agent profile. |
| "Does the reviewer use a different model?" | The profile does not specify one. A different role does not imply a different model. |
| "Are you running multiple agents in parallel?" | The core script is sequential. Built-in delegation may be available, but we only claim activity visible in the session. |
| "Why not just prompt 'fix everything'?" | A bounded task lets us identify the cause, preserve working behavior, and judge the evidence. |
| "Does the app now need an LLM or MCP server?" | No. Agents help write the app; its runtime remains dependency-free browser code and the Node server. |
| "Why do I still review it?" | Agents can misunderstand rules or miss cases. Their output and summaries are not the acceptance criteria. |

## Final message to the room

> "Across three clients, the pattern stayed the same: inspect the problem,
> constrain the task, implement, and verify. Skills made procedures reusable.
> A custom reviewer made the review responsibility explicit. Optional cloud
> delegation changed where work happened, not who owns the decision to accept it."

For the complete minute-by-minute schedule, use the
[facilitator guide](facilitator-guide.md). For customization details, use
[repository customization](customization.md). Product explanations here were
checked against the linked official documentation on 2026-10-15; actual client
controls and account availability still require rehearsal.
