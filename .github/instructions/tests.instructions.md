---
applyTo: "test/**/*.js,acceptance/**/*.js"
---

Use node:test and node:assert/strict. Keep baseline tests under test/ green on
the deliberately unfinished starter; put required new behavior under acceptance/.
Add a failing regression before the fix when coverage is missing.

Assertions must encode the business rules, not mirror an implementation formula.
Use explicit expected cents, stock labels and candidate SKUs. Cover invalid
inputs, inclusive boundaries, tie ordering and explicit UI callback behavior.
Do not weaken assertions, skip a failing lab or change fixture prices to hide bugs.

Recovery tests use uniquely created temporary directories, preserve unrelated
files and delete only their own fixtures. Symlink privilege limitations must be
reported as skipped, not claimed tested. Real browser behavior and print
pagination still require separate evidence.
