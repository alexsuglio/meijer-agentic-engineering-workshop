# Presenter only: delegate the SAME pricing task

This is an optional demonstration during the CLI lab, not a participant exercise
or a release-validation step. No cloud job has been launched during local
validation. Use your own writable GitHub repository, with an explicitly approved cloud
agent entitlement and organization policy. A local-only repository without a
remote cannot produce a real cloud PR.

Participants' read-only internal clones remain fully usable for all three
local labs. Ownership/write permission follows your account's access to the
remote repository; cloning your own repo does not remove those permissions.

## Prepare before presenting

Publish a VERIFIED starter only through your separately authorized maintainer
process. Keep main at the unfinished starter. Use a clean owner clone, ideally
separate from your local demonstration clone:

```sh
git clone "<PRESENTER_OWNED_GITHUB_URL>" freshcart-cloud-demo
cd freshcart-cloud-demo
git status --short
git remote -v
npm ci
npm test
copilot
```

pnpm: replace `npm ci` with `pnpm install --frozen-lockfile` and `npm test`
with `pnpm test`. No local HTTP server is required for cloud delegation.
Confirm the displayed remote is YOUR intended repository and that the baseline
is the starter. A clean clone is recommended so there are no unrelated edits to
checkpoint; it is not a permission workaround.

## Explain local versus remote before the command

Say: "The CLI lab just ran locally. `/delegate` sends the same task to Copilot
cloud agent on GitHub. It creates a branch and draft PR and returns links. This
requires my presenter permissions; participants do not run it."

Inside Copilot CLI, paste the following only after deciding to launch the remote
task:

```text
/delegate Fix the FreshCart BOGO odd-quantity pricing defect in src/pricing.js.
Read docs/business-rules.md and use the pricing-regression skill.
Three units of GRAN-001 at349 cents must total698 cents. Preserve q0/q1,
standard and even-quantity behavior, integer validation and separate-SKU
pricing. Add or retain explicit regression coverage. Do not change other labs
or copy solutions/. Run npm test and npm run test:lab2 (pnpm equivalents are
also acceptable). Leave the resulting draft PR unmerged. Do not enable
auto-merge or Agent merge.
```

Copilot may ask to commit unstaged changes as a checkpoint in its new branch.
Do not approve unrelated content. If a dirty clone is offered, cancel and use the
prepared clean owner clone instead. Do not rewrite participant work.

## Show actual links and evidence

Read the actual branch, draft-PR URL and agent-session URL the CLI returns.
Open those links. Do not show invented URLs, and do not claim the task completed
while it is still running. Inspect the changed files and the actual pricing test
results when available. The baseline CI deliberately does not require all
acceptance suites; Lab1 and Lab3 remain unfinished.

The desktop app's **My work** can be used to browse the actual PR if the account
has access. This is optional viewing, not the Lab3 local edit session.

**End state:** PR remains unmerged, main remains the starter, and no auto-merge
or Agent merge is enabled. Owner access stays intact. Do not merge as part of
the workshop cleanup.

## If cloud execution is unavailable or slow

Show this prompt and explain the documented flow without running it, or inspect
a pre-existing authorized demonstration and clearly identify it as earlier work.
Do not fabricate live evidence. Continue the local pricing lab; no participant
is blocked by the cloud demonstration.

Source: [Delegating tasks to Copilot](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca).
