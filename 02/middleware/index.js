function setCookie(req, res, next) {
    res.set('Set-Cookie', 'asd=qwe');
    next();
}

function setDate(req, res, next) {
    res.reqDate = new Date().toISOString();
    next();
}

module.exports = {
    setCookie,
    setDate
}