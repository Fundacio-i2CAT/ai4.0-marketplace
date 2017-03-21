var express = require('express');
// var http = require('http');
// var https = require('https');
// var fs = require('fs');
// var privateKey = fs.readFileSync('/home/safeuser/ssl/pi40.key');
// var certificate = fs.readFileSync('/home/safeuser/ssl/pi40.crt');
// var credentials = {key: privateKey, cert: certificate};
var app = express();


app.use('/', express.static('.tmp/serve'));
app.use('/app', express.static('src/app'));
app.use('/bower_components', express.static('bower_components'));
app.use('/assets', express.static('src/assets'));
var port = 8080;
app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: '.tmp/serve' });
});

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

// httpServer = http.createServer(app);
// httpsServer = https.createServer(credentials, app);
// httpServer.listen(8080);
// httpsServer.listen(8443);
