const fs = require('fs');
const path = require('path');
const relativePath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(relativePath, 'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => {
    const { stdout } = process;
    stdout.write(data);
});
