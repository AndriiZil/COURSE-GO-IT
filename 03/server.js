const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(logger('dev'));

const {
    validateWeatherQuery,
    addCorsHeaders,
    allowOriginHeaders
} = require('./middleware');

// app.use(addCorsHeaders);
// app.use(allowOriginHeaders);
app.use(cors());

app.get('/weather', (req, res) => {
    console.log(req.query);
    res.send({ message: 'get ok' });
});

app.get('/test', (req, res) => {
    res.send('Ok');
})

app.get('/', validateWeatherQuery, async (req, res) => {
    const KEY = process.env.API_WEATHER_KEY;
    const { q: city } = req.query;
    // console.log(req.body);
    // console.log(req.query);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;

    const { data } = await axios.get(url);
    // console.log(result);

    res.send({ data });
});

app.listen(PORT, () => console.log(`Server was started o port: ${PORT}`));