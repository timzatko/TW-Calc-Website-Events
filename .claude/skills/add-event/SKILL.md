---
name: add-event
description: Add a new The West event JSON file to the events/ directory. Use when the user wants to create a new event, such as Easter, Valentine's Day, Christmas, Oktoberfest, etc.
argument-hint: '[event-name or description]'
---

# Add New Event

Your job is to collect the necessary information and create a new event JSON file in the `events/` directory.

## Event JSON Structure

```json
{
    "key": "snake_case_event_key",
    "name": "Human Readable Event Name",
    "year": 2026,
    "from": "YYYY-MM-DD HH:MM:SS",
    "to": "YYYY-MM-DD HH:MM:SS",
    "beta_from": "YYYY-MM-DD HH:MM:SS",
    "beta_to": "YYYY-MM-DD HH:MM:SS",
    "items": [],
    "sets": [],
    "quests": [],
    "tombola": null,
    "forum_url": ""
}
```

Fields:

- `key`: snake_case identifier matching the filename suffix (e.g. `easter` → `2026_easter.json`)
- `name`: Display name (e.g. "Easter Event 2026")
- `year`: The year as an integer
- `from` / `to`: Live server start/end dates, format `YYYY-MM-DD HH:MM:SS`
- `beta_from` / `beta_to`: Beta server start/end dates
- `items`: Array of integer item IDs (omit or use `[]` if none)
- `sets`: Array of set name strings (omit or use `[]` if none)
- `quests`: Array of integer quest IDs (omit or use `[]` if none)
- `tombola`: Integer tombola ID, or omit the field entirely if there is no tombola
- `forum_url`: Full URL to the forum thread announcing the event

## Filename

The file should be named: `events/{year}_{key}.json`

Example: `events/2026_easter.json`

## Steps

Ask questions **one at a time** and wait for the user's answer before moving to the next. Do not ask multiple questions in a single message.

Use $ARGUMENTS as a starting point if provided (e.g. pre-fill event name/key from it), but still ask about any fields not covered.

Ask in this order:

1. **Event name** — e.g. "Easter Event 2026" (if not clear from $ARGUMENTS)
2. **Key** — suggest a snake_case key derived from the name and confirm with the user
3. **Year** — suggest the current year and confirm
4. **Live start date** (`from`) — accept any date/time format the user provides (e.g. "March 15 10:00", "15.03.2026 10:00", "2026-03-15") and reformat it to `YYYY-MM-DD HH:MM:SS`. If time is omitted, default to `00:00:00`.
5. **Live end date** (`to`) — same flexible input, reformat as above
6. **Beta start date** (`beta_from`) — same flexible input; user can say "none" to skip
7. **Beta end date** (`beta_to`) — only ask if beta_from was provided; same flexible input
8. **Item IDs** — ask for a comma-separated list, or "none"
9. **Set names** — ask for a comma-separated list, or "none"
10. **Quest IDs** — ask for a comma-separated list, or "none"
11. **Tombola ID** — ask for an integer, or "none"
12. **Forum URL** — ask for the full URL, or "none"

After all answers are collected:

- Omit optional fields (`sets`, `items`, `quests`, `tombola`, `forum_url`) if they are empty/null rather than including empty arrays or null values — but include them when values are provided.
- Write the JSON file to `events/{year}_{key}.json` with 4-space indentation, matching the format of existing event files.
- Ask the user if they want to commit the new file. If yes, stage and commit it with message: `Add events/{filename}`
