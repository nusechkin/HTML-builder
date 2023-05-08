const { readdir, mkdir, copyFile } = require('fs/promises');
const fs = require('fs/promises');
const path = require('path');

const absPath = path.join(__dirname, 'files');
const newPath = path.join(__dirname, 'files-copy');

(async () => {
    const createDir = await mkdir(newPath, { recursive: true});
    for (const file of await fs.readdir(newPath)) {
        await fs.unlink(path.join(newPath, file));
    }

    const files = await readdir(absPath, {withFileTypes: true});
    for (const file of files) {
        const filePath = path.join(absPath, file.name);
        const newFilePath = path.join(newPath, file.name);
        if (file.isFile()) {
            const temp = await copyFile(filePath, newFilePath);
        }
    }
})();