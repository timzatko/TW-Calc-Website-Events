const { readEvent, writeEvent } = require('./utils');
const { basename } = require('path');

function sort(obj, key) {
    if (!obj.hasOwnProperty(key)) {
        return;
    }
    obj[key].sort();
}

console.log('Formatting events...');

const files = process.argv.splice(2);

files.forEach(filePath => {
    const fileName = basename(filePath);
    const event = readEvent(fileName);
    sort(event, 'items');
    sort(event, 'sets');
    sort(event, 'quests');
    writeEvent(fileName, event);
});

console.log('Events format succeeded!');
