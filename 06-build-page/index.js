const { readdir, mkdir, copyFile } = require('fs/promises');
const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');

let data = '';

(async () => {
    const createDir = await mkdir(newPath, { recursive: true});
    const stream = fs.createReadStream(templatePath, 'utf-8');
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => {
        const componentsPath = path.join(__dirname, 'components');
        // const files = await readdir(absPath, {withFileTypes: true});
        // for (const file of files) {
        //     const filePath = path.join(absPath, file.name);
        //     const newFilePath = path.join(newPath, file.name);
        //     if (file.isFile()) {
        //         await copyFile(filePath, newFilePath);
        //     }
        // }
        //здесь подмена переменных в дате файлами-компонентами
    });
})();
