
const https = require('https'),
    express = require('express'),
    app = express(),
    url = require('url'),
    http = require('http'),
    util = require('util'),
    path = require('path'),
    fs = require('fs'),
    ytdl = require('ytdl-core'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({
    agent: https.globalAgent
}); // See (†)

app.get('/youtube/:vid', function (req, res) {
    ytdl.getInfo('http://www.youtube.com/watch?v=' + req.params.vid, function (err, info) {
        let downloadUrl = info.formats[0].url
        var result = url.parse(downloadUrl);
        let host = result.hostname.replace(".googlevideo.com", '')
        let path = result.path
        res.redirect('/stream/youtube/' + host + path);
    })
})

app.get('/stream/youtube/:host/*', function (req, res) {
    let host = req.params.host + '.googlevideo.com'
    req.url = req.url.replace('/stream/youtube/' + req.params.host + '/', '/')
    proxy.web(req, res, {
        target: 'https://' + host, headers: {
            host: host
        }
    });
})


app.listen(process.env.PORT, function () {

    console.log('Example app listening on port ' + process.env.PORT)
})