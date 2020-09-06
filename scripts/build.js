const path = require('path');
const fs = require('fs');

const { getEvent, getEventFiles, buildPath, buildFilePath } = require('./utils');

const events = [];

console.log('Building...');

getEventFiles().forEach(fileName => {
    const event = getEvent(fileName);

    events.push(event);
});

if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
}

fs.writeFileSync(buildFilePath, JSON.stringify(events));

console.log('Success! Output: ' + buildFilePath);
