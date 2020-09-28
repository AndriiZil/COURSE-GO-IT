const Joi = require('joi');

function validateWeatherQuery(req, res, next) {
    const weatherQuerySchema = Joi.object({
        q: Joi.string().required()
    });

    const { error } = weatherQuerySchema.validate(req.query);
    
    if (error) {
        // console.log(JSON.stringify(error, null, 2));
        const { message } = error.details[0];
        return res.send({ error: message });
    }

    next();
}

function allowOriginHeaders(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
}

function addCorsHeaders(req, res, next) {
    res.set('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    next();
}

module.exports = {
    validateWeatherQuery,
    allowOriginHeaders,
    addCorsHeaders
};