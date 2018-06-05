const express = require('express')
const path = require('path')
const sslRedirect = require('heroku-ssl-redirect');
const PORT = process.env.PORT || 5000
const Logger = require('log-color')
const indexLogger = new Logger({
    level: 'debug',
    color: true
})
var bodyParser = require('body-parser')
const webpush = require('web-push');

const serverKey = {
    publicKey: process.env.PUSH_SERVER_PUBLIC_KEY,
    privateKey: process.env.PUSH_SERVER_PRIVATE_KEY
}

webpush.setVapidDetails(
    'mailto:stories282@gmail.com',
    serverKey["publicKey"],
    serverKey["privateKey"]
);

app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(sslRedirect())
app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', function(req, res) {
        res.render('pages/index')
    })

app.post('/notification/to/:machineID', function (request, response) {
    machineID = request.params.machineID
    indexLogger.info('machine id: ' + machineID + ' just entered')

    pushNotiInfo = request.body
    indexLogger.debug('push noti client info: ' + JSON.stringify(pushNotiInfo))

    pushSubscriptionData = {
        "endpoint": pushNotiInfo["endpoint"],
        "keys": {
            "auth": pushNotiInfo["auth"],
            "p256dh": pushNotiInfo["p256dh"]
        }
    }

    responseMessage = {}
    responseCode = 200

    try {
        webpush.sendNotification(pushSubscriptionData, pushNotiInfo["text"])
        responseMessage["msg"] = "push sended to id: " + machineID
        indexLogger.info('push msg successfully sent to id: ' + machineID)
    }
    catch (except) {
        responseMessage["msg"] = "push crashed id: " + machineID
        responseMessage["except"] = except
        responseCode = 500
        return
    }

    response.setHeader('Content-Type', 'application/json');
    response.status(responseCode).send(JSON.stringify(responseMessage))
})

app.listen(PORT, function() {
    console.log('Listening on ', PORT)
})