const http = require('http');
const fs = require('fs');
const path = require('path');

const cssfiles = fs.readdirSync("./styles", { withFileTypes: true }).map(file => file.name);

let homepage = '/';
let aboutpage = '/about';
let contactpage = '/contact-me';

let page404;
fs.readFile('./pages/404.html', (err, data) => {
    if (err) {
        console.error('Error reading 404.html:', err);
      } else {
        page404 = data;
      }
});


const server = http.createServer((req, res) => {
    if (req.url === homepage) {
        servePage('./pages/index.html', res);
    } else if (req.url === aboutpage) {
        servePage('./pages/about.html', res);
    } else if (req.url === contactpage) {
        servePage('./pages/contact-me.html', res);
    } else if (req.url.startsWith('/styles/') && cssfiles.includes(path.basename(req.url))) {
        serveStaticFile('.' + req.url, 'text/css', res);
    }
    else {
        // Handle 404 for other pages
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(page404);
        res.end();
    }
});

function servePage(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(page404);
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
}

function serveStaticFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
            res.end();
        }
    });
}

server.listen(3000, () => console.log('Server running on port 3000'));``