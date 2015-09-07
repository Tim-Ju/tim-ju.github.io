
var express = require('express');
var path = require('path');
var app = express();

function appServer(_path){

    app.use('/', express.static(process.cwd() + '/' + _path));
    return app
}

module.exports = appServer