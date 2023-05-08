const { readdir } = require('fs/promises');
const fs = require('fs');
const path = require('path');
let data = '';

const absPath = path.join(__dirname, 'styles');
console.log(absPath);

(async () => {
    const files = await readdir(absPath, {withFileTypes: true});
    for (const file of files) {
        if (file.isFile()) {
            const ext = file.name.substring(file.name.indexOf('.') + 1);
            if (ext === 'css') {
                const filePath = path.join(absPath, file.name);
                const stream = fs.createReadStream(filePath, 'utf-8');
                stream.on('data', chunk => data += chunk);
                stream.on('end', () => {
                    const cssPath = path.join(__dirname, 'project-dist', 'bundle.css');
                    fs.open(cssPath, 'w',  (err) => {
                        if(err) throw err;
                    });
                    const outputToFile = fs.createWriteStream(cssPath);
                    outputToFile.write(data);
                    data = '';
                });
            }
        }
    }
})();