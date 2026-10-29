<p align="center">
  <img src="assets/logo.png" alt="Garrison" width="160" height="160">
</p>

# usegarrison.ai

Marketing website for [Garrison](https://github.com/jchristn/Garrison), a self-hosted, multi-tenant control plane that runs headless agent harnesses (Claude Code, Codex, Mux, Gemini CLI, or any CLI described by a harness profile) on pull-based workers, exposed over REST, MCP, and A2A. Hosted on GitHub Pages at **[usegarrison.ai](https://usegarrison.ai)**.

## Development

Plain static site, like the other sites in this family: no build step, framework, or runtime dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000.

## Files

- `index.html`: the complete page
- `styles.css`: styling, with light and dark themes driven by CSS variables on `data-theme`
- `script.js`: theme toggle (follows the system preference until you pick one, then remembers it), mobile menu, install tabs, and copy buttons
- `favicon.ico`, `assets/`: logo, icons, and dashboard screenshots, copied from the Garrison repository's `assets/` folder
- `CNAME`: GitHub Pages custom domain (`usegarrison.ai`)

## Deployment

Pushing to `main` deploys through GitHub Pages (branch `main`, folder `/`). Product facts and install commands on the page come from the Garrison repository's `README.md`, `docs/DOCKER.md`, `docs/KUBERNETES.md`, and `docs/QUICKSTART.md`; update them here when those change. The site has no analytics or client-side tracking.

Writing rules: no em dashes, and loopback addresses are written as `127.0.0.1`.
