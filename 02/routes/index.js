const { Router } = require('express');

const router = Router();

router.get('/course', (req, res, next) => {
    res.send({ message: 'Course' });
});

router.post('/course', (req, res, next) => {
    res.send({ message: 'Ok' });
});

module.exports = router;