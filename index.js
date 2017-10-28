const http = require('http');
const port = process.env.RANDOM_HTTP_SERVER_PORT || 80;

let statusCodes;

if (typeof process.env.STATUS_CODES !== 'undefined' && process.env.STATUS_CODES !== null) {
    statusCodes = JSON.parse(process.env.STATUS_CODES);
} else {
    statusCodes = [200, 201, 301, 304, 400, 401, 403, 404, 500, 502, 503];
}

const getRandomStatusCode = () => {
    return statusCodes[Math.floor(Math.random() * statusCodes.length)];
};

const requestHandler = (request, response) => {
    response.statusCode = getRandomStatusCode();
    response.end();
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
    if (err) {
        return console.error('Something is wrong :(', err);
    }

    console.log(`Server is listening on ${port}`);
});
