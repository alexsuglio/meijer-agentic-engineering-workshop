# Product sources and rehearsal boundaries

These references ground the intended Copilot workflow. They are not evidence
that the author's installed Copilot clients authenticated or executed it. Local
app commands and browser behavior were validated; authenticated Copilot
client workflows and cloud actions were not. Rehearse the actual
installed client versions before delivering the workshop; labels and rollout
availability can change.

| Topic | Official source | Workshop use |
|---|---|---|
| Desktop sessions, local repository selection, Plan/Interactive | [Working with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions) | Keep Lab3 on the same local clone as the server |
| Desktop customization and agent selection | [Customize the Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app) | Agent picker or /agent |
| CLI /delegate behavior | [Delegating tasks to Copilot](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca) | Presenter branch/draftPR/session links, unstaged checkpoint |
| CLI skills | [Adding skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills) | .github/skills/name/SKILL.md and /skills list/info/reload |
| Custom agent tools and profile format | [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration) | Explicit read/search/execute aliases; omitted tools means all |
| Customization surfaces | [Customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) | Optional prompt files labeled VS Code-only |
| Desktop My work | [Managing issues and pull requests](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests) | Optional presenter viewing, not required participant publishing |
| App modes and tool approval | [App slash commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands) | /autopilot differs from /allow-all-tools or /yolo |
| Cloud environment setup | [Configure the development environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment) | Single copilot-setup-steps job; no live launch required |
| Node installation | [Node downloads](https://nodejs.org/en/download) | Node24 LTS target |
| VS Code agent/tool controls | [Use tools in chat](https://code.visualstudio.com/docs/agents/run/tools) | Chat input > Agent picker > Agent; expand tool request > Allow |

Product documentation was checked on 2026-10-15. The desktop session guide
explicitly supports sidebar **Projects > +**, selecting an existing folder,
choosing **your local repository** below the prompt box, and selecting the
session mode below the prompt field. The cloud setup guide requires a single
`copilot-setup-steps` job and currently illustrates checkout v6/setup-node v7.
These references ground the instructions; live authenticated-client rehearsal
and live GitHub Actions/cloud execution are not claimed.

The app runs without Copilot authentication. Copilot plan/entitlement, organization
policy, model availability, tool approval, GitHub host support and cloud-agent
eligibility remain separate account/client checks.
