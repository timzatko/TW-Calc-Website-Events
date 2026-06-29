---
name: deploy
description: Deploy the events to tw-calc.net locally from this machine, authenticating with the TW_CALC_API_KEY environment variable. Use when the user wants to push event changes live without the CI deploy job (e.g. while the GitHub Actions deploy is blocked by WEDOS bot protection).
---

# Deploy events locally

Build the events bundle and POST it to tw-calc.net **from the local machine**, authenticating with the `TW_CALC_API_KEY` environment variable.

> **Why this exists:** the GitHub Actions `deploy` job is currently blocked by WEDOS.protection (an ALTCHA bot challenge) that returns `401` for the CI runner. Deploying from a real local machine can bypass that challenge. Remove this skill once the CI deploy is fixed.

## Safety rules

- **Never print, echo, or log the value of `TW_CALC_API_KEY`.** Always reference it as `"$TW_CALC_API_KEY"` so the shell expands it without exposing it.
- **Do not run the deploy via `npm run deploy -- "$KEY"`** — npm echoes the full script command (including the key) to stdout, leaking it. Call `node ./scripts/deploy.js "$TW_CALC_API_KEY"` directly instead (see step 3), which does not echo its arguments.
- This is an outward-facing action that publishes the events live. Confirm with the user before running the deploy step unless they already told you to deploy.
- Run all commands from the repository root.

## Steps

1. **Verify the API key is available** (checks presence only, never prints the value):

    ```bash
    test -n "$TW_CALC_API_KEY" && echo "key present" || echo "MISSING"
    ```

    If it prints `MISSING`, stop and ask the user to export it first — e.g. by typing in the prompt:
    `! export TW_CALC_API_KEY=...` — or by adding it to their shell profile (`~/.zshrc`). Do **not** ask them to paste the key into the chat.

2. **Build the events bundle** (regenerates `dist/events.json`):

    ```bash
    npm run build
    ```

3. **Deploy** by calling the script directly (passes the key from the environment without echoing it — do **not** use `npm run deploy`, which would print the key):
    ```bash
    node ./scripts/deploy.js "$TW_CALC_API_KEY"
    ```

## Reporting the outcome

- On success the script prints `Success!` — tell the user the events are live.
- On failure it prints the error plus the HTTP `Response status` and `Response body`. Relay the status and a short summary of the body.
    - If the body is the `WEDOS.protection` / ALTCHA challenge page, the local IP is also being challenged — tell the user the deploy is still blocked and a WEDOS-side bypass for `/service/update-events` is needed.

## Notes

- This skill does **not** commit or push to git; it only builds and deploys the current events to `https://tw-calc.net/service/update-events`.
