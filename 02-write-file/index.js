const fs = require('fs');
const path = require('path');
const relativePath = path.join(__dirname, 'text.txt');
fs.open(relativePath, 'w',  (err) => {
    if(err) throw err;
    //console.log('Write something');
});
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});