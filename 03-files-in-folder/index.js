const path = require('path');
const { readdir } = require('fs/promises');
const fs = require('fs/promises');
const absPath = path.join(__dirname, 'secret-folder');
console.log(absPath);

(async () => {
    const files = await readdir(absPath, {withFileTypes: true});
    for (const file of files){
        if (file.isFile()) {
            const filePath = path.join(absPath, file.name);
            const name = file.name.substring(0, file.name.indexOf('.'));
            const ext = file.name.substring(file.name.indexOf('.') + 1);
            const sizeInBytes = await fileSize(filePath);
            console.log(`${name} - ${ext} - ${sizeInBytes} bytes`);
        }
    }
})();

async function fileSize (path) {
    const stats = await fs.stat(path);
    return stats.size;
}
