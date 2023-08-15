const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate')



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

const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    const { pathname, query } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    }



    else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);

    }
    else {
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