// all the middlewares which shoul be included in prod env 
// should be imported in prod.js file

const helmet = require("helmet")
const compression = require("compression")

module.exports = function(app){
    app.use(helmet())
    app.use(compression())
    app.use(compression())
}