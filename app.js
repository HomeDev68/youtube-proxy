const express = require('express')
const app = express()

const fs = require('fs');
const ytdl = require('ytdl-core');



app.get('/:vid', function (req, res) {
    ytdl.getInfo('http://www.youtube.com/watch?v=' + req.params.id, function (err, info) {
        res.json(info)
    })
})

app.listen(process.env.PORT, function () {

    console.log('Example app listening on port ' + process.env.PORT)
})