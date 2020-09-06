const { getEvent, getEventFiles } = require('./utils');

console.log('Validating event file names...');

getEventFiles().forEach(fileName => {
    const event = getEvent(fileName);
    const expected = event.year + '_' + event.key + '.json';

    if (fileName !== expected) {
        console.error(`ERROR! Event file "${fileName}" does not satisfy the pattern "eventYear_eventKey"`);
        process.exit(1);
    }
});

console.log('Success! All event file names are valid!');
