const express = require('express');

const app = express();

app.use(express.json(), (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

let messages = [];

app.post('/messages', (req, res) => {
    messages.push(req.body.text);
    res.json({
        message: 'success'
    })
});

app.get('/messages', (req, res) => {
    res.json({
        messages
    })
})


app.listen(3000, () => {
    console.log('Server was started.');
})