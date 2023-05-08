const fs = require('fs');
const path = require('path');
const relativePath = path.join(__dirname, 'text.txt');
fs.open(relativePath, 'w',  (err) => {
    if(err) throw err;
});

const readline = require('readline');
const { stdin, stdout } = require('process');

const rl = readline.createInterface({ input: stdin, output: stdout });
const outputToFile = fs.createWriteStream(relativePath);
stdout.write('Please, write something valuable\n');

rl.on('line', (input) => {
  if (input.includes('exit')) {
    outputToFile.write('\n' + input.substring(0, input.indexOf('exit')));
    bye();
  }
  else {
    outputToFile.write('\n' + input);
  }
})

rl.on('SIGINT', bye);

function bye(){
  stdout.write('Good luck');
  rl.close();
}