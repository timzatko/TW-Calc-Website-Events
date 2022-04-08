const fs = require('fs');

const { readEvent, getEventFiles, buildPath, buildFilePath } = require('./utils');

const events = [];

console.log('Building...');

getEventFiles().forEach(fileName => {
    const event = readEvent(fileName);

    events.push(event);
});

if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
}

fs.writeFileSync(buildFilePath, JSON.stringify(events));

console.log('Success! Output: ' + buildFilePath);
