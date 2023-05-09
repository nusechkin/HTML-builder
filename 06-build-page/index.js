const { readdir, mkdir, copyFile } = require('fs/promises');
const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');

let data = '';
let flagsArr = [];
let componentsArray = [];

createDir();
readTemplate();
mergeStyles();

async function createDir() {
    const createDir = await mkdir(bundlePath, { recursive: true});
}

function readTemplate() {
    const stream = fs.createReadStream(templatePath, 'utf-8');
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => {
        let temp = '';
        let write = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === '{' && data[i+1] === '{') {
                write = true;
            }
            else if (data[i] === '}' && data[i+1] === '}') {
                write = false;
                flagsArr.push(temp);
                temp = '';
            }
            if (write && data[i] !== '{') {
                temp+=data[i];
            }
        }
        getComponents();
    });
};

async function getComponents(){
    console.log(flagsArr);
    const componentsPath = path.join(__dirname, 'components');
    const files = await readdir(componentsPath, {withFileTypes: true});
    for (let i = 0; i < files.length; i++) {
        if (files[i].isFile()) {
            console.log(files[i].name);
            let name = files[i].name.substring(0, files[i].name.indexOf('.'));
            if (flagsArr.includes(name)) {
                let tempData = '';
                const filePath = path.join(componentsPath, files[i].name);
                const stream = fs.createReadStream(filePath, 'utf-8');
                stream.on('data', chunk => tempData += chunk);
                stream.on('end', () => {
                    data = data.replace(`{{${name}}}`, tempData);
                    if (i === (files.length - 1)) {
                        writeToFile(data);
                    }
                });
            }
        }
    }
}

function writeToFile(data) {
    const htmlPath = path.join(__dirname, 'project-dist', 'index.html');
    fs.open(htmlPath, 'w',  (err) => {
        if(err) throw err;
    });
    const outputToFile = fs.createWriteStream(htmlPath);
    outputToFile.write(data);
}

async function mergeStyles() {
    const absPath = path.join(__dirname, 'styles');
    const files = await readdir(absPath, {withFileTypes: true});
    let cssData = '';
    for (const file of files) {
        if (file.isFile()) {
            const ext = file.name.substring(file.name.indexOf('.') + 1);
            if (ext === 'css') {
                const filePath = path.join(absPath, file.name);
                const stream = fs.createReadStream(filePath, 'utf-8');
                stream.on('data', chunk => cssData += chunk);
                stream.on('end', () => {
                    const cssPath = path.join(__dirname, 'project-dist', 'style.css');
                    fs.open(cssPath, 'w',  (err) => {
                        if(err) throw err;
                    });
                    const outputToFile = fs.createWriteStream(cssPath);
                    outputToFile.write(cssData);
                    cssData = '';
                });
            }
        }
    }
}