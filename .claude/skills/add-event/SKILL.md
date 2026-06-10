---
name: add-event
description: Add a new The West event JSON file to the events/ directory. Use when the user wants to create a new event, such as Easter, Valentine's Day, Christmas, Oktoberfest, etc.
argument-hint: '[event-name, description, or paste forum announcement text]'
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
- `items`: Array of integer item IDs (e.g. `54796000`). These are the full numeric IDs matching the URL `https://tw-calc.net/item/54796000`.
- `sets`: Array of set key strings (e.g. `"easter_2026_set_1"`). These match the URL `https://tw-calc.net/sets/easter_2026_set_1`.
- `quests`: Array of integer quest IDs (omit or use `[]` if none)
- `tombola`: Integer tombola ID, or omit the field entirely if there is no tombola
- `forum_url`: Full URL to the forum thread announcing the event

## Filename

The file should be named: `events/{year}_{key}.json`

Example: `events/2026_easter.json`

## Steps

### Path A — Forum Announcement Text Provided

If the user pastes a full forum announcement (multi-line text with dates, item/set names, etc.), use this path:

**Step 1 — Parse the announcement**

Extract from the text:

- Event name and year
- Beta server start/end dates and live server start/end dates (accept any format, convert to `YYYY-MM-DD HH:MM:SS`; if time omitted default to `00:00:00`). **Beta dates come first** — collect and reason about `beta_from`/`beta_to` before the live `from`/`to`. Announcements are usually from the beta forum, so if only one date range is given it is almost always the **beta** range; ask the user for the live dates rather than assuming the single range is live.
- Any item names or set names mentioned
- Forum URL (if the user also provided it, or if visible in the text)
- Quest IDs and tombola ID if mentioned

**Step 2 — Look up items on tw-calc.net**

Fetch `https://tw-calc.net/inventory/new?per-page=200` and search for items whose names contain the event keywords (e.g. "Easter 2026"). If needed, also fetch page 2 (`?per-page=200&page=2`). Collect all matching item IDs (the full integer, e.g. `54796000`).

If the announcement lists specific item names (e.g. "Prisoner's hat"), also search for those names directly in the fetched pages.

**Step 3 — Look up sets on tw-calc.net**

Derive the event set key prefix from the event name:

- "Easter 2026" → `easter_2026`
- "Valentine's Day 2026" → `valentine_2026`
- "Independence Day 2026" → `independence_2026`
- "Oktoberfest 2026" → `oktoberfest_2026`
- "Holiday 2025" / "Christmas 2025" → `holiday_2025`

Then iterate: fetch `https://tw-calc.net/sets/{prefix}_set_1`, `_set_2`, `_set_3`, … until you get a 404. Collect every set key that resolves (e.g. `["easter_2026_set_1", "easter_2026_set_2", ...]`).

**Step 4 — Present a summary for confirmation**

Show the user what you parsed and found:

- Proposed key, name, year
- Proposed dates — list **beta dates first**, then live dates
- Item IDs found (with count)
- Set keys found (with count)
- Quest IDs and tombola ID (if any)
- Forum URL

Ask the user to confirm or correct anything, including fields you could not determine.

**Step 5 — Write the file** (after confirmation)

Proceed to file creation as described in the "Writing the file" section below.

---

### Path B — No Forum Text (Interactive Q&A)

Ask questions **one at a time** and wait for the user's answer before moving to the next.

Use $ARGUMENTS as a starting point if provided (e.g. pre-fill event name/key from it), but still ask about any fields not covered.

Ask in this order:

1. **Event name** — e.g. "Easter Event 2026" (if not clear from $ARGUMENTS)
2. **Key** — suggest a snake_case key derived from the name and confirm with the user
3. **Year** — suggest the current year and confirm
4. **Beta start date** (`beta_from`) — accept any date/time format the user provides (e.g. "March 15 10:00", "15.03.2026 10:00", "2026-03-15") and reformat to `YYYY-MM-DD HH:MM:SS`. If time is omitted, default to `00:00:00`. User can say "none" to skip.
5. **Beta end date** (`beta_to`) — only ask if beta_from was provided; same flexible input
6. **Live start date** (`from`) — same flexible input, reformat as above
7. **Live end date** (`to`) — same flexible input, reformat as above
8. **Items** — ask if you should search tw-calc.net for event items. If yes, fetch `https://tw-calc.net/inventory/new?per-page=200` (and page 2 if needed) to find items matching the event name, then confirm with the user. Otherwise ask for a comma-separated list of item IDs, or "none".
9. **Sets** — ask if you should search tw-calc.net for event sets. If yes, derive the set key prefix (see Step 3 above) and iterate until 404, then confirm. Otherwise ask for a comma-separated list of set keys, or "none".
10. **Quest IDs** — ask for a comma-separated list, or "none"
11. **Tombola ID** — ask for an integer, or "none"
12. **Forum URL** — ask for the full URL, or "none"

---

## Writing the file

- Omit optional fields (`sets`, `items`, `quests`, `tombola`, `forum_url`) if they are empty/null rather than including empty arrays or null values — but include them when values are provided.
- Write the JSON file to `events/{year}_{key}.json` with 4-space indentation, matching the format of existing event files.
- Ask the user if they want to commit the new file. If yes, stage and commit it with message: `Add events/{filename}`
