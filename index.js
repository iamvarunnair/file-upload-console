const express = require('express');
const app = express();
const port = 3000;
const middlewares = require('./middlewares');
const constants = require('./constants');
const upload = require('./controllers/upload');
const files = require('./controllers/files');

// set appRoot globally
global.appRoot = __dirname;

// client app build
app.use('/', express.static('client-app/dist'));

// middlewares
app.use(middlewares.middlewareBusboy);
app.use(middlewares.logger);
app.use(middlewares.cors());

// file storage
app.use(constants.PATH_FILES, express.static('files'));

// app.use(...middlewares);

// routes
app.route('/api/files/upload').post(upload?.post);
app.route('/api/files/download/:fileName').get(files?.get);
app.route('/api/files').get(files?.get);

// server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
