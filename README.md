# TW-Calc Website Events

[![CI](https://github.com/timzatko/TW-Calc-Website-Events/workflows/CI/badge.svg)](https://github.com/timzatko/TW-Calc-Website-Events/actions?query=workflow:CI+branch:master)

![](./docs/logo.png)

This repository provides a method of updating or adding new events to tw-calc.net website (in the [events section](https://tw-calc.net/event)) for the community.
If you spot any incorrect/outdated/missing information, or the whole event feel free to submit a pull request. Please follow the [contribution](#contributing) guidelines.

## How it works?

All of the events on the [https://tw-calc.net/event](https://tw-calc.net/event) are defined in the `events` [directory](./events) of this repository.
To update the event on the website you need to update the respective file of that event in this repository.

## Contributing

We are happy you would like to contribute! Please read the instructions below to get familiar with the process.
As soon as you get familiar with the process, fork the repository, make the desired and submit the pull request.

### Setup

1. Clone/Fork this repository
2. Run `npm install` inside of the repository (you need to have [Node](https://nodejs.org/en/) installed, we use version `v10.x.x`)

### Adding a new event

To add a new event you need to create a new [.json](https://en.wikipedia.org/wiki/JSON) file inside the `events` directory. The file name consists of the event year and event key and must match this pattern `eventYear_eventKey` (eg. `2020_octoberfest`, `2019_xmas_sale`).
The `eventKey` is usually name of the event in lowercase, where spaces are replaced with the underscores (`_`) and special characters (eg. `!,?-'"`) are removed.
The changes will be visible on the website after the new file change is merged to the master branch and the pipeline succeeds (the _deploy_ stage must run).

### Event schema

Every event json file must comply with the event [schema.json](./schema.json).
You can check if the files inside the event directory complies with the schema by running - `npm run schema:lint`.
This check is also done in the `lint` stage of the pipeline.
You can define the following properties to the event - _key_, _year_, _name_, _items_, _sets_, _quests_, _tombola_, _from_, _to_, _beta_from_, _beta_to_, _forum_url_, _hidden_, _widget_config_.

This is an example how the schema looks like. You can find more examples in the events [directory](./events).

```json
{
    "key": "valentine",
    "items": [51890000, 51891000, 51892000],
    "sets": ["valentine_2020_set_1", "valentine_2020_set_2", "valentine_2020_set_3", "valentine_2020_set_4"],
    "from": "2020-02-13 10:00:00",
    "to": "2020-03-04 23:59:59",
    "year": 2020,
    "quests": [216],
    "tombola": 27,
    "beta_from": "2020-02-03 00:00:00",
    "beta_to": "2020-02-26 23:59:59"
}
```

#### `key`

This property **is required**. The key (in the combination with year) must be unique.
The `key` is usually name of the event in lowercase, where spaces are replaced with the underscores (`_`) and special characters (eg. `!,?-'"`) are removed.
This property **must be same as the `eventKey` in the filename**.

For the following recurring events always use these keys. Then the event will have a special background and text in its banner, also you don't need to provide its name property as it will be added automatically (the name will also be translated).

- Valentine's day - `valentine`
- The Independence day - `independence`
- Octoberfest - `octoberfest`
- Easter - `easter`
- Christmas Sale - `xmas_sale`
- Day of the Dead - `dotd`

#### `year`

This property **is required**. It denotes the year when the event started.

#### `name`

The name of the event, eg. _Soccer Event_, _Spring Sale_.
This property _is required_ if the event key is not one from the: _valentine_, _independence_, _octoberfest_, _easter_, _xmas_sale_, _dotd_.

#### `items` (optional)

The array of item ids which can be gained during this event from quests, tombola etc. or are introduced by this event.
If you specify the set key/s in the sets property, the items of that set/s will be automatically included and you don't need to reference them in this property anymore.

You can obtain the item id on the item page or from its url - `https://tw-calc.net/item/<item_id>` (eg. [https://tw-calc.net/item/396000](https://tw-calc.net/item/396000))

#### `sets` (optional)

The array of set keys which can be gained during this event from quests, tombola etc. or are introduced by this event.

You can obtain the set key from the set url - `https://tw-calc.net/sets/<set_key>` (eg. [https://tw-calc.net/sets/set_dancer](https://tw-calc.net/sets/set_dancer))

#### `quests` (optional)

The array of quest ids which comes together with this event.

You can obtain the quest id from the quest url - `https://tw-calc.net/quests/group/<quest_id>` (eg. [https://tw-calc.net/quests/group/171](https://tw-calc.net/quests/group/171))

#### `tombola` (optional)

The tombola id, if the event comes with the tombola.

You can obtain the tombola id from the tombola url - `https://tw-calc.net/tombola/<tombola_id>_2020` (eg. [https://tw-calc.net/tombola/29_2020](https://tw-calc.net/tombola/29_2020))

#### `from`, `to`, `beta_from`, `beta_to` (optional)

These properties define the start and the end of the event on regular and the beta servers (you can obtain these dates from forum announcements).
The date must be in the following format - `YYYY-MM-DD hh:mm:ss`. (eg. `2020-01-20 20:01:00` which is _20 Jan 2020 20:01:00_)
All of these fields are optional, if they are unknown in the time of creating event, however they should be provided later.

#### `forum_url`

The url to the forum announcement of this event. Refer to the english forums and prefer beta.

### Updating/Deleting an event

To update an event you need to change the respective file in the `events` directory (according to the [event schema](#event-schema)).
If you would like to delete some event, you need to remove its file from the repository. The changes will be visible on the website after your change is merged to the master branch.
