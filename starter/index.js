const fs = require('fs');
const http = require('http');
const url = require('url');



// // blocking synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// // console.log("🚀 ~ file: index.js:3 ~ textIn:", textIn)
// const textOut = `this is what we know about avocado ${textIn}\nCreated at ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('File written');


// Non-blocking asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log({ data2 });

//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log({ data3 });
//             fs.writeFile('./txt/final.txt', `${data2}\n\n${data3}`, 'utf-8', err => { });
//             console.log('File has been written 🚀');
//         });

//     });
// });
// console.log('will read file');

//SERVER

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // console.log("🚀 ~ file: index.js:33 ~ server ~ req:", req) 

    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview')
        res.end('hello from the server! It is over view');
    else if (pathName === '/product') {
        res.end('hello from the server! It is prod');
    } else {
        res.writeHead(404, {
            'Content-type': "text-html",
            'myHeader': 'hellow-world'

        });
        res.end('<h1>page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('listening to request on port 8000');
});