const path = require('path');
const fs = require('fs');

const { getEvent, getEventFiles } = require('./utils');

const buildPath = path.join(__dirname, '..', 'dist');
const outFile = path.join(buildPath, 'events.json');
const events = [];

console.log('Building...');

getEventFiles().forEach(fileName => {
    const contents = getEvent(fileName);

    events.push(contents);
});

if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
}

fs.writeFileSync(outFile, JSON.stringify(events));

console.log('Success! Output: ' + outFile);
