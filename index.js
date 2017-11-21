'use strict';

var	http = require('http'),
	express = require('express'),
    app = express(),
	fs = require('fs'),
	path = require('path');

app.use(express.static(__dirname + '/'));

// Error handling
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

var server = app.listen(process.env.PORT || 8111, function () {
   var port = server.address().port;
   console.log("Server listening on port", port);
});
