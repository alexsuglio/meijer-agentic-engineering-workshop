---
applyTo: "public/**/*.js,public/**/*.html,public/**/*.css"
---

Use existing DOM helpers and textContent for synthetic product content. Keep
visible labels and focus indicators. Announce success with the status region and
errors with the alert region; do not silently recover into a success state.

The browser is a local operations demo, not a purchase flow. Keep search,
department filtering, basket editing, manual replacement and storage persistence
working while adding one lab. Use existing replacement callbacks rather than
duplicating persistence logic in the suggestion renderer.

Suggestions must display reasons, show an explicit Replace button for each
candidate and clear old buttons on no-match. Never replace an item while rendering.
Reset demo data must not imply code rollback. Verify narrow and wide layouts and
keyboard-only interactions; do not infer a browser pass from helper tests.
