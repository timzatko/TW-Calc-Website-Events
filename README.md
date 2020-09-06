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

### Setup

1. Clone/Fork this repository
2. Run `npm install` inside of the repository (you need to have [Node](https://nodejs.org/en/) installed, we use version `v10.x.x`)

### Adding a new event

To add a new event you need to create a new file inside the `events` directory. The file name consists of the event year and event key and must match this pattern `eventYear_eventKey` (eg. `2020_octoberfest`, `2019_xmas_sale`).

### Updating/Deleting an event

To update an event you need to change the respective file in the `events` directory (according to the [event schema](#event-schema)).
If you would like to delete some event, you need to remove its file from the repository. The changes will be visible on the website after your change is merged to the master branch.
