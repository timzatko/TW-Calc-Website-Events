// Just a wrapper so ajv command accepts multiple files...
const { getEvent } = require('./utils');
const { basename } = require('path');

const args = ['npx', 'ajv', '-s', 'schema.json', '-d'];
const files = process.argv.splice(2).forEach(fileName => {
    args.push('-d');
    args.push(fileName);
});

const { exec } = require('child_process');
const child = exec(args.join(' '), (error, stdout, stderr) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }

    if (stderr) {
        console.log(error);
        process.exit(2);
    }

    console.log(stdout);
});
