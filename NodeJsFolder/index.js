// // CommonJS (.js) → Uses require()
// // ES Modules (.mjs) → Uses import/export

// // To run the below code, first installed chalk package and then also changed package.json "type": "module" or can also make a .mks file
// import chalk from 'chalk';

// console.log(chalk.blue('Hello, Ayush!'));
// console.log(chalk.red.bold('Error: Something went wrong!'));
// console.log(chalk.green.underline('Success!'));





// // Internal Packages: fs, path, os, http,...
// // If below code is showing error, u can either remove "type": "module" from package.json    OR    import fs from 'fs' instead of require

// const fs = require('fs');
// // import fs from 'fs';
// fs.writeFile('a1.txt', 'Hello, Ayush! 🚀', (err) => {
//     if (err) {
//         console.error('Error writing file:', err);
//         return;
//     }
//     console.log('File written successfully!');
// });
// fs.readFile('a1.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }
//     console.log('File content:', data);
// });




// const os = require('os');
// console.log('Operating System:', os.platform()); // Windows, Linux, macOS
// console.log('Total Memory:', os.totalmem()); // In bytes
// console.log('Free Memory:', os.freemem()); // In bytes
// console.log('CPU Cores:', os.cpus().length);


// const path=require("path");
// console.log(__dirname);
// console.log(path.join(__dirname, 'a1.txt'));







// Create a CLI that lets the user specify a file path and the nodejs process counts the number of words inside it.
// Input- node index.js /Users/kirat/file.txt
// Output- u have 10 words in this file
// Then also try this with commander

// const fs=require("fs");
// function main(fileName) {
//     fs.readFile(fileName,"utf-8",function(err,data) {
//         let total=0;
//         for(let i=0;i<data.length;i++) {
//             if(data[i]===" ") {
//                 total++;
//             }
//         }
//         console.log(`You have ${total+1} words in this file`);
//     })
// }
// main(process.argv[2]);   // node index.js a1.txt   It means arg[2] is a1.txt 


// Alternate using comander
const { Command } = require("commander");
const fs = require("fs");
const program = new Command();
program
  .version("1.0.0")
  .description("CLI tool to count words in a file")
  .argument("<filePath>", "Path to the file")
  .action((filePath) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("❌ Error reading file:", err.message);
        process.exit(1);
      }

      const words = data.trim().split(/\s+/);  // Splitting by any whitespace (spaces, newlines, tabs)
        console.log(`✅ You have ${words.length} words in this file.`);
    });
  });

program.parse(process.argv);
