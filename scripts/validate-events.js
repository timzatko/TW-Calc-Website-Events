const { getEvent } = require('./utils');
const { basename } = require('path');

console.log('Validating event file names...');

const files = process.argv.splice(2);

files.forEach(filePath => {
    const fileName = basename(filePath);
    const event = getEvent(fileName);
    const expected = event.year + '_' + event.key + '.json';

    if (fileName !== expected) {
        console.error(`ERROR! Event file "${fileName}" does not satisfy the pattern "eventYear_eventKey"`);
        process.exit(1);
    }

    if (event.beta_from && !isYear(event.beta_from, event.year)) {
        console.error(`ERROR! Event file "${fileName}" year "beta_from" is not "${event.year}"!`);
        process.exit(2);
    }

    if (event.from && !isYear(event.from, event.year)) {
        console.error(`ERROR! Event file "${fileName}" year "from" is not "${event.year}"!`);
        process.exit(3);
    }

    if (event.beta_from && !isBefore(event.beta_from, event.beta_to)) {
        console.error(`ERROR! Event file "${fileName}" year "beta_from" must be before "beta_to"!`);
        process.exit(4);
    }

    if (event.from && !isBefore(event.from, event.to)) {
        console.error(`ERROR! Event file "${fileName}" year "from" must be before "to"!`);
        process.exit(5);
    }
});

function isYear(dateString, year) {
    const date = new Date(dateString);
    return year === date.getFullYear();
}

function isBefore(dateString1, dateString2) {
    return new Date(dateString1).getTime() <= new Date(dateString2).getTime();
}

console.log('Success! All event file names are valid!');
