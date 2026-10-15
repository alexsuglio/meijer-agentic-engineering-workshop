# Facilitator guide and minute-by-minute script

This is the delivery script for the local starter. Review the recorded
[validation](validation.md) and rehearse the exact client steps before
inviting participants. Keep the full source/docs available offline; Copilot
authentication and model access are separate network prerequisites.

## Prepare the room and your copies

Have the internal read-only URL, baseline `workshop-v1` commit, Node24/npm/pnpm
version evidence, three required clients, a tested projector and printed quick
reference. Verify keyboard visibility and zoom. Use synthetic data only.

Keep one untouched starter, one disposable local demonstration clone and,
optionally, a clean owner clone for `/delegate`. Label terminal tabs with their
absolute paths. Only one local HTTP server should own the chosen port.
Use [rehearsal](rehearsal.md), not destructive reset commands.

Validate both package-manager paths beforehand; participants choose one. Have
the [solution recovery guide](solutions.md) open, but do not apply all solutions
to the demonstration starter. Rehearse each independent lab starting from its
unfinished state.

Cloud demo prerequisites are the presenter's responsibility. It is optional,
requires owner/write access and stays unmerged. Prepare an honest documentation
walkthrough if live cloud eligibility or latency makes it unsuitable.
Do not create dummy issues/PRs for participants.

## Agenda and success definition

| Range | Duration | Activity |
|---|---|---|
| 00-15 | 15 minutes | Setup and framing |
| 15-45 | 30 minutes | VS Code lab: 5 frame / 10 demo / 15 practice |
| 45-75 | 30 minutes | CLI lab: 5 frame / 10 demo / 15 practice |
| 75-80 | 5 minutes | Break |
| 80-110 | 30 minutes | App lab: 5 frame / 10 demo / 15 practice |
| 110-120 | 10 minutes | Evidence review and wrap |

Success is a correct local change with inspectable evidence, not number of
prompts, lines generated or remote PRs. Each participant should show a named rule,
the actual diff, relevant test output and a browser observation.

## Minute-by-minute run of show

Each row is the minute beginning at the listed elapsed mark. Use the exact
participant prompts in the linked lab, rather than inventing broader tasks live.
If a model takes longer, preserve practice time: show the documented reference
diff as a clearly identified explanation, not a fake live success.

| Minute | Say / do / observe |
|---|---|
| 00 | Welcome: "Today we improve a grocery pickup desk, locally, with evidence." |
| 01 | State boundaries: fictional data, no production, no participant remote writes. |
| 02 | Explain agent, diff, acceptance test and SKU in plain language. |
| 03 | Show the internal URL and fixed starter tag; distinguish clone from publishing. |
| 04 | Confirm participants own editable local folders despite read-only remotes. |
| 05 | Have everyone choose npm OR pnpm; do not install the other unnecessarily. |
| 06 | Check Node24 and Git versions; route blockers to setup troubleshooting. |
| 07 | Run the selected clean install; explain dependency-free does not mean lock-free. |
| 08 | Run setup:check; separate automatic checks from manual Copilot entitlement. |
| 09 | Run baseline tests; explain why green baseline does not mean all features exist. |
| 10 | Start HTTP server; point to the printed absolute checkout path. |
| 11 | Open browser, search oat and switch departments; show real filtering. |
| 12 | Change basket quantity2 to4 and back; show correct even BOGO. |
| 13 | Manually replace unavailable order item, then Reset demo data. |
| 14 | Confirm three client sign-ins/tool permissions; transition to VS Code. |
| 15 | Frame Lab1: "On-hand stock is not sellable stock." |
| 16 | Show banana: 10 on hand,8 reserved,2 available. |
| 17 | Define zero precedence and inclusive reorder threshold. |
| 18 | Show unfinished badge/filter; name the single classifier target. |
| 19 | Read Lab1 checkpoints; remind participants not to touch shared stock math. |
| 20 | Open the correct folder and Chat in VS Code; paste Lab1 step1. |
| 21 | Inspect the traced caller and classifier; reject unrelated refactoring. |
| 22 | Open acceptance cases; run test:lab1 and read the intended assertion. |
| 23 | Explain difference between assertion failure and setup/module failure. |
| 24 | Paste Lab1 implementation prompt with exact return shape and boundaries. |
| 25 | Review requested edits/commands before approving local tool use. |
| 26 | Inspect actual diff; compare zero and threshold branches. |
| 27 | Run baseline and Lab1 tests; read real exit results. |
| 28 | Refresh browser; verify three low-stock products, two out-of-stock products, and five under Needs attention. |
| 29 | Combine search/department/stock filters; hand control to participants. |
| 30 | Practice begins: everyone reproduces their starter classifier gap. |
| 31 | Ask pairs to state expected banana label before prompting. |
| 32 | Check that acceptance output is a behavioral failure, not missing files. |
| 33 | Encourage bounded edits; intercept attempts to solve all labs. |
| 34 | Check tool approvals without enabling broad auto-approval. |
| 35 | Ask participants to locate zero precedence in their own diff. |
| 36 | Check threshold equality; low stock is inclusive. |
| 37 | Have each pair run baseline plus test:lab1 themselves. |
| 38 | Inspect browser filter counts after clearing search/department. |
| 39 | Ask one participant to show combined filter behavior. |
| 40 | Offer narrow lab1 solution preview only to people choosing recovery. |
| 41 | Advanced participants may try the replenishment-summary stretch. |
| 42 | Ask for one file/rule/expected/actual example from each pair. |
| 43 | Run git status; preserve all local changes, no push required. |
| 44 | Transition: "The next bug hides in a green test suite, not in stock." |
| 45 | Frame Lab2: explain BOGO within one SKU. |
| 46 | Ask audience to calculate quantity3 at349 cents: expected698. |
| 47 | Show starter UI wrongly charging349 at quantity3. |
| 48 | Explain regression tests and why even-quantity tests missed it. |
| 49 | State CLI scope and prohibition on participant cloud delegation. |
| 50 | Start copilot from the same clone; show skill list/info. |
| 51 | Paste Lab2 reproduction prompt; inspect failing odd-quantity assertion. |
| 52 | Paste bounded fix prompt; review charged units, not seed prices. |
| 53 | Run baseline and pricing tests; inspect actual diff. |
| 54 | Select grocery-rules-reviewer; request file/rule/test evidence. |
| 55 | Show browser quantities1-5 and separate single-unit SKU total. |
| 56 | Optional presenter demo: switch to clearly labeled clean OWNER clone. |
| 57 | Explain remote boundary; paste SAME pricing task with /delegate if authorized. |
| 58 | Show actual returned branch/PR/session links, or honestly state not launched. |
| 59 | Keep PR unmerged; return to local participant practice and preserve time. |
| 60 | Practice begins: participants use local CLI, never the owner cloud clone. |
| 61 | Confirm skill discovery or explicit-file fallback is disclosed. |
| 62 | Ask each pair to reproduce quantity3 before changing code. |
| 63 | Check regression expectation is literal698, not copied faulty logic. |
| 64 | Check BOGO quantity0 and1, not only large odd values. |
| 65 | Check standard-price behavior remains unchanged. |
| 66 | Check separate SKUs cannot form a free pair. |
| 67 | Review invalid-input and overflow behavior. |
| 68 | Have participants run targeted and baseline checks independently. |
| 69 | Inspect reviewer evidence table; reject generic "looks good" reports. |
| 70 | Confirm browser quantity3 shows6.98 after refresh. |
| 71 | Offer the receipt-savings stretch to participants who passed core checks. |
| 72 | Offer lab2-only recovery preview when explicitly chosen. |
| 73 | Record expected/actual pricing evidence and untouched lab files. |
| 74 | Stop active CLI edits; announce break and desktop-app transition. |
| 75 | Break begins; no silent tool/permission changes during the break. |
| 76 | Help blocked attendees individually with setup, not remote rights. |
| 77 | Check presenter terminals point at the intended local demo clone. |
| 78 | Confirm server remains responsive without starting a duplicate. |
| 79 | Ask participants to return and open the desktop app. |
| 80 | Frame Lab3: "A suggestion is not a replacement until a person chooses." |
| 81 | Show unavailable OAT-001 order and required synthetic metadata. |
| 82 | Explain hard gates: category/package/stock/tags/exclusions/price. |
| 83 | Explain deterministic ranking and max3; unknown metadata rejects. |
| 84 | Name both helper and renderer; show existing manual replacement. |
| 85 | Choose SAME local repository in app; compare server/session paths. |
| 86 | Select Plan, paste Lab3 inspection prompt, inspect bounded file scope. |
| 87 | Ask substitution-check to explain positive and negative fixtures. |
| 88 | Move to Interactive and paste complete helper-plus-UI prompt. |
| 89 | Inspect integer cap and exact package match in the proposed diff. |
| 90 | Inspect callback wiring, explanations and explicit Replace buttons. |
| 91 | Run baseline and Lab3 checks; distinguish helper from DOM-fixture evidence. |
| 92 | Refresh browser; show ordered OAT-003/OAT-002/OAT-004 suggestions. |
| 93 | Prove no auto-replacement, then click, reload and reset demo data. |
| 94 | Show no-match test and clear stale-button behavior; begin practice. |
| 95 | Practice begins: each participant checks local session path first. |
| 96 | Ask pairs to list hard rejections before implementation. |
| 97 | Check unknown versus known-empty metadata handling. |
| 98 | Check stock equality and reserved-unit subtraction. |
| 99 | Check same package size/unit; reject invented unit conversions. |
| 100 | Check 418-pass/419-fail cap using original349 list price. |
| 101 | Check stable price-delta then SKU tie order and max3. |
| 102 | Check renderer explanations and explicit callback action. |
| 103 | Run baseline plus test:lab3; inspect actual failures or successes. |
| 104 | Exercise browser click/reload/reset; compare served checkout path. |
| 105 | Ask reviewer for rule-specific evidence, not a generic approval. |
| 106 | Offer lab3-only helper-and-UI recovery if explicitly chosen. |
| 107 | Offer comparison-panel stretch after core acceptance is green. |
| 108 | Capture unresolved client/browser limitations honestly. |
| 109 | Stop active edits and transition to evidence review. |
| 110 | Wrap: ask for one before/after behavior from each surface. |
| 111 | Compare prompting tactics: inspect, constrain, implement, verify. |
| 112 | Show how reusable skills differ from always-on instructions. |
| 113 | Explain reviewer execute permission is not a read-only sandbox. |
| 114 | Reinforce local clones remain editable without remote write access. |
| 115 | Demonstrate replay instructions, not a destructive reset. |
| 116 | Explain browser reset versus code replay one last time. |
| 117 | Confirm owner cloud PR remains unmerged if one was launched. |
| 118 | Have participants save their notes/work and stop local servers. |
| 119 | Close at120: "Keep the evidence and the starter; practice again safely." |

## Transitions to say verbatim

Setup to IDE: "We have a working baseline with intentionally unfinished
behavior. First we will make stock truth visible, not change stock arithmetic."

IDE to CLI: "The same checkout moves with us. A different surface does not
change our business rules, and a green baseline can still miss a regression."

CLI to app: "Close active edits before handing off. In the app, choose the same
local repository. A beautiful diff in a different worktree is not the browser
we are testing."

App to wrap: "A ranked list is not a completed feature until the user can
understand it, act explicitly, see feedback and recover."

## Coaching and recovery

For a slow participant, preserve the core acceptance outcome and omit stretches.
Ask them to describe expected versus actual before providing a solution.
If choosing recovery, preview only their current lab, explain which edited files
will be backed up, obtain explicit confirmation, then verify the result.
Never overwrite another participant's work or apply all solutions silently.

If tooling is blocked, record the exact denial and use a paired demonstration.
Do not enable auto-approval, change organizational policy or use another client
to evade the same restriction. Distinguish an implementation problem from an
unavailable client/account permission.

If the presenter cloud task is still running, show actual state, keep its PR
unmerged, and move on. Participant practice never depends on cloud completion.

## End-of-session checklist

Collect actual test/browser evidence, not confidence ratings alone. Confirm local
work is preserved, no participant remote writes occurred, and the starter tag/main
remain unfinished. Stop server terminals. Keep solution backups until participants
choose their own cleanup. Review unresolved setup/client issues before the next
delivery, and update the validated-version record only from actual observation.
