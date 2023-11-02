// middlewares
const busboy = require('connect-busboy'); //middleware for form/file upload
const cors = require('cors');

const middlewareBusboy = busboy();
// log response
const logger = (req, res, next) => {
    const timestamp = Date.now();
    console.log(
        `Log request: ${req.method} ${
            req.protocol + '://' + req.get('host') + req.originalUrl
        } ${res?.body || ''} ${new Date()} ${timestamp}`
    );
    let send = res.send;
    res.send = (c) => {
        console.log(
            `Log response: ${res.statusCode} ${JSON.stringify(c)} ${timestamp}`
        );
        res.send = send;
        return res.send(c);
    };
    next();
};

module.exports = {
    middlewareBusboy,
    logger,
    cors
};
