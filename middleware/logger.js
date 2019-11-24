function log(req, res, next){
    console.log("logger middleware initiated")
    next();
}

module.exports = log;