const express = require('express')
const path = require('path')
const sslRedirect = require('heroku-ssl-redirect');
const PORT = process.env.PORT || 5000

app = express()
app.use(sslRedirect())
app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', function(req, res) {
        res.render('pages/index')
    })

app.post('/notification/to/:machineID', function (request, response) {
    machineID = request.params.machineID
    response.send("hello, " + machineID)
})

app.listen(PORT, function() {
    console.log('Listening on ', PORT)
})