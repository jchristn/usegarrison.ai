<p align="center">
  <img src="assets/logo.png" alt="Garrison" width="160" height="160">
</p>

# usegarrison.ai

Marketing website for [Garrison](https://github.com/jchristn/Garrison) v0.2.0, a self-hosted, multi-tenant platform that runs agent harnesses (Claude Code, Codex, Mux, Gemini CLI, opencode, pi, or any CLI described by a harness profile) on pull-based workers, exposed over REST, MCP, and A2A, with Garrison Agent Studio for designing, deploying, and promoting agentic apps. Hosted on GitHub Pages at **[usegarrison.ai](https://usegarrison.ai)**.

## Development

Plain static site, like the other sites in this family: no build step, framework, or runtime dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000.

## Files

- `index.html`: the complete page
- `styles.css`: styling, with light and dark themes driven by CSS variables on `data-theme`
- `script.js`: theme toggle (follows the system preference until you pick one, then remembers it), mobile menu, sticky nav, install tabs, copy buttons, and scroll reveals (skipped under `prefers-reduced-motion`)
- `favicon.ico`, `assets/`: logo, icons, and dashboard screenshots, copied from the Garrison repository's `assets/` folder
- `CNAME`: GitHub Pages custom domain (`usegarrison.ai`)

## Deployment

Pushing to `main` deploys through GitHub Pages (branch `main`, folder `/`). Product facts and install commands on the page come from the Garrison repository's `README.md`, `AGENT_DESIGN_DEPLOY_PLAN.md`, `docs/SCALING.md`, `docs/testing/D062_SCALE_RECOVERY.md`, `docs/DOCKER.md`, `docs/KUBERNETES.md`, and `docs/QUICKSTART.md`; update them here when those change. The comparison table reflects each platform's public documentation as of October 2026. The site has no analytics or client-side tracking.

Writing rules: no em dashes, and loopback addresses are written as `127.0.0.1`.
