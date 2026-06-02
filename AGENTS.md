# Eternal Website — Project AGENTS (GK / CC / Future Agents)

**Project root:** `/home/randy/Documents/Eternal Website/`  
**Live site goal:** eternalwebsite.com (one-page premium web design service for small local businesses)  
**Main objective of entire rice:** Build a website agency. This vault + repo is the second brain / canonical home for all web dev work.

## Mandatory Startup (Every Session)
1. Read this `AGENTS.md`.
2. Read `Report.md` (current state, decisions, logs, handoff notes).
3. Read `notes/Competitors.md`, `notes/Content.md` (when exists), `notes/Pricing.md`, `notes/Branding.md`.
4. `ls -la site/` + `cd site && git status` (if git inited) to see current build state.
5. Check `~/Obsidian/CLI Core/CLI Tasks.md` + `CLI Reports.md` for any related top-level tasks (Eternal is the flagship pending until marked complete).

## Core Rules (from global AGENTS.md + this project spec)
- **GK does heavy lifting / coding.** CC reviews the entire thing (use review skill, /review, or spawn reviewer subagent). User mostly opens VS Code to review finals. "I won't be doing basically nothing more than opening VScode and reviewing the final results."
- **Document everything:** For **every** file created or edited in `site/` (or root notes), create or update a companion note (in `notes/<relative-path>.md` or sidecar). Note must cover: purpose, key code, decisions/tradeoffs, how to customize (for client clones), cross-refs.
- **Report.md is the single source of truth** for the project (like CLI Reports). Update it with session log, file changes, verification, research, handoffs **on every significant turn**. Append, never overwrite history.
- **Use the tools:** todo_write (track sub-tasks, one in_progress), enter_plan_mode for any ambiguity or high-impact change, spawn_subagent for parallel (explore for research, implement/review for code), skills (implement/review/check-work/design/execute-plan). Always `search_tool` before first `use_tool` on grok_com_github MCP.
- **Dual handoff:** Shared via this vault (Report + notes + AGENTS) + main `~/Obsidian/CLI Core/`. Write clear "CC: ..." or "GK: ..." sections when pausing for the other.
- **No user exec:** Do everything possible yourself (mkdir, npm, git, MCP GH calls, builds, verification). Only ask via ask_user_question for subjective choices (taglines, exact prices, hosting tweaks).
- **End of every session:** Run `dotfiles-sync save` (global rice rule). Update main CLI Tasks (mark complete only when truly done per checklist) + CLI Reports with log. Push the eternal git repo.
- **Verification always:** After any UI/content change: build, local serve/preview, manual section check (hero/CTA, pricing, form, mobile), optional Lighthouse or check-work subagent. Note results in Report. User sees final in VS Code.
- **Scope lock (v1):** Strictly one-page as specified in CLI Tasks. Hero+CTA, Services, Portfolio (placeholders), 3-tier Pricing, About, Contact form. Premium but not flashy. Clean/professional/trustworthy. Fast static. Purple #8b3fff accent (user brand tie-in). Local Florida (Bradenton/Sarasota) flavor.
- **Git + GitHub:** Sensible commits (per section or logical change). Use MCP `grok_com_github__*` (after search) for repo create / remote file ops if helpful. Main branch. Good README pointing to Report.md.
- **Second brain:** Link heavily in main Obsidian vault (Home, Dashboard, CLI Notes). This folder can be opened as additional Obsidian vault. All future client sites / web experiments live here or sub-vaults referenced from here.
- **Rice reference:** User's accent is always #8b3fff. Personal rice (AGS glassmorphism, Waybar, Hypr, theme system, Thunderbird for admin@, etc.) is the support system — reference but do not break unless a follow-up task is added to CLI Tasks first.

## Recommended Workflow for Changes
1. Update relevant todo item(s).
2. Read target file(s) + its note + Report section.
3. Make edit (write for new, search_replace for edit — always read first).
4. Immediately: create/update companion .md note + append to Report.md (session log + "changed X because Y, see note").
5. Test: build + preview + manual + (Lighthouse / a11y spot check).
6. Commit (small, descriptive).
7. If review needed: spawn reviewer or note for CC.
8. At natural milestones or end: push, update main CLI Reports/Tasks if applicable, dotfiles-sync save.

## Tech Stack (v1)
- Astro + Tailwind + TS (minimal).
- Static `dist/`.
- Form: simple JS + fallback to mailto / admin@eternalwebsite.com (or Formspree key later). No heavy backend.
- Hosting: static (Netlify/Vercel recommended for free custom domain + forms; cPanel static upload as fallback since parking page exists).
- See `notes/Deployment.md` (when written) + Report for exact steps.

## When to Enter Plan Mode or Spawn
- Any ambiguity in requirements, architecture, or pricing/copy.
- Before large refactors or adding v2 features (multi-page, blog, client portal).
- For parallel tracks (one agent on copy, one on components).

## Handoff Protocol
When pausing for the other CLI:
- Append clear section to Report.md: "**Handoff to CC (or GK):** [date] — Current state: X built, Y verified. Please: review via `code .` + read notes/ + Report. Focus on Z (design / copy / code quality / deploy). Use review skill if you want formal output. Reply here or in main CLI Core so we can continue."
- Update todo statuses.
- Push everything.

## Resources
- Main rice AGENTS: `~/.grok/AGENTS.md` + `~/Obsidian/CLI Core/` (Reports/Tasks for global state).
- Skills: `~/.grok/skills/` (implement, review, check-work, design, execute-plan, etc.).
- MCP GitHub: grok_com_github (search_tool first).
- Web tools for ongoing research/competitor updates.
- Business email: See `~/Obsidian/Quick Notes/Business Email Setup - admin@eternalwebsite.com.md` (Thunderbird primary).

**This file + Report.md + notes/ are the contract.** Follow them so the other agent (CC) or future GK can pick up seamlessly.

*Created 2026-06-02 during initial GK build per user "read your notes and do your tasks". Update as project evolves.*