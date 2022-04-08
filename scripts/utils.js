const path = require('path');
const fs = require('fs');

const target = 'https://tw-calc.net';
const eventsPath = path.join(__dirname, '..', 'events');
const buildPath = path.join(__dirname, '..', 'dist');
const buildFilePath = path.join(buildPath, 'events.json');

module.exports = {
    getEventFiles,
    readEvent,
    writeEvent,
    buildPath,
    buildFilePath,
    target,
};

function getEventFiles() {
    return fs.readdirSync(eventsPath);
}

function readEvent(fileName) {
    const filePath = path.join(eventsPath, fileName);
    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
}

function writeEvent(fileName, event) {
    const filePath = path.join(eventsPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(event), { encoding: 'utf8' });
}
