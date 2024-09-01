const fs = require('fs');
const path = require('path');

const snipFilePath = path.join(__dirname, 'Snip', 'snip.txt'); // Adjust this path to where Snip outputs the file

function getCurrentSong() {
    fs.readFile(snipFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading Snip file:', err);
            return;
        }
        console.log('Currently Playing Song:', data.trim());
    });
}

getCurrentSong();
