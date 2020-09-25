const express = require('express');
const logger = require('morgan');
const PORT = process.env.PORT || 3000;

const { setCookie, setDate } = require('./middleware');
const courses = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', courses);

app.use((req, res, next) => {
    console.log('Middleware called!');
    next();
})

app.get('/', (req, res) => {
    res.send({ message: 'GET' });
});

app.get('/hello', (req, res, next) => {
    const date = new Date().toISOString();
    
    req.dateRequest = date;
    next();

}, (req, res) => {
    console.log(req.dateRequest);
    res.json({ message: 'Hello Express '});
});

app.post('/hello', setCookie, setDate, (req, res) => {
    console.log(req.body);

    res.send('Ok');
});

app.get('/user', (req, res) => {
    throw new Error('Error');

    res.send('Ok');
});

app.use((err, req, res, next) => {
    console.log(err);
});

app.listen(PORT, () => console.log(`Server was started on port ${PORT}`));