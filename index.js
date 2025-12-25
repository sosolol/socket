const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('WebSocket server ready');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(process.env.PORT || 8080);
console.log('Server running');
