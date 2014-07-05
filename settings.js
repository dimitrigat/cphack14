module.exports = function (app, configurations, express, logger) {

    var nconf = require('nconf')
        , cachify = require('connect-cachify')
        , winston = require('winston')
        , requestLogger = require('winston-request-logger')
        , errorhandler = require('errorhandler')
        , bodyParser = require('body-parser')
        , methodOverride = require('method-override')

    nconf.argv().env().file({ file: 'local.json' })

    // load assets node from configuration file.
    var assets = nconf.get('assets') || {}

    // get the environment, default to development
    var env = process.env.NODE_ENV || 'development';

    // Development Configuration
    if ('development' == env || 'test' == env) {
        // register the request logger
        app.use(requestLogger.create(logger))
        app.set('DEBUG', true)
        //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))

        // error handling middleware
        app.use(errorhandler())
    }

    // Production Configuration
    if ('production' == env) {
        app.set('DEBUG', false)
        app.use(express.errorHandler())
    }

    // Cachify Asset Configuration
    app.use(cachify.setup(assets, {
        root: __dirname + '/public',
        production: nconf.get('cachify')
    }))

    // Global Configuration
    app.set('views', __dirname + '/views')
    app.set('view engine', 'jade')
    app.set('view options', { layout: false })
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json())
    app.use(methodOverride())
    app.use(express.static(__dirname + '/public'))

    return app
}