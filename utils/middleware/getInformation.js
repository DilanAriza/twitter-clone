function getReqInformation(toGet) {
    return function(req, res, next) {
        res.set(toGet, req.body[toGet])
        console.log(res.headers);
        console.log(res.headers);
        console.log(res.headers.locals);
        next();
    }
}

module.exports = getReqInformation;