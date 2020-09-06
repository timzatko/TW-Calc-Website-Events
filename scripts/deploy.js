const fs = require('fs');
const axios = require('axios');

const { buildFilePath, target } = require('./utils');

if (!fs.existsSync(buildFilePath)) {
    console.error('ERROR! Build file does not exist!');
    process.exit(1);
}

const events = JSON.parse(fs.readFileSync(buildFilePath, { encoding: 'utf8' }));
const apiKey = process.argv.splice(2).pop();

if (!apiKey) {
    console.error('ERROR! The API key was not provided!');
    process.exit(2);
}

(async () => {
    await axios
        .post(`${target}/service/update-events?apiKey=${apiKey}`, { events })
        .then(() => {
            console.log('Success!');
        })
        .catch(resp => {
            const error = resp.toJSON();

            console.log(
                'ERROR!',
                `The following error occurred during the deployment: "${error.name}: ${error.message}"`,
            );
            process.exit(3);
        });
})();
