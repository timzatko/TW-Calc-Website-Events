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

1. Gather the event details from the user (or from $ARGUMENTS if provided). Ask for any missing required fields:

    - Event name and key
    - Year
    - Live server from/to dates
    - Beta server from/to dates
    - Item IDs (if any)
    - Set names (if any)
    - Quest IDs (if any)
    - Tombola ID (if any)
    - Forum URL

2. Omit optional fields (`sets`, `items`, `quests`, `tombola`) if they are empty/null rather than including empty arrays or null values — but include them when values are provided.

3. Write the JSON file to `events/{year}_{key}.json` with 4-space indentation, matching the format of existing event files.

4. Ask the user if they want to commit the new file. If yes, stage and commit it with message: `Add events/{filename}`
