const path = require('path');
const fs = require('fs');

const eventsPath = path.join(__dirname, '..', 'events');

module.exports = {
    getEventFiles,
    getEvent,
};

function getEventFiles() {
    return fs.readdirSync(eventsPath);
}

function getEvent(fileName) {
    const filePath = path.join(eventsPath, fileName);

    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
}
