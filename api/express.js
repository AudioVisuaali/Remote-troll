const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error');
const optionsHandler = require('./middleware/options');
const notFoundHandler = require('./middleware/notFound');
const path = require('path');
const lockSystem = require('lock-system');
const { audio } = require('system-control');
const sound = require('sound-play');

// middleware
app.use(optionsHandler);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 * Endpoints
 */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/lock-screen', (req, res) => {
  lockSystem();
  res.status(200).json({ lulw: 'lulw' });
});

app.get('/troll', async (req, res) => {
  audio.volume(10);
  sound.play(__dirname + '/public/lie.mp3');
  res.status(200).json({ lulw: 'lulw' });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
