const express = require('express')
const mongoose = require('mongoose')
const app = express()
console.log(process.env.CONNECTION_STRING)
// COnnection string format: mongodb://user:pwd@host:port/db
if (!process.env.CONNECTION_STRING) {
  throw Error("CONNECTION_STRING environment variable is missing")
  process.exit(1)
}
mongoose.connect(process.env.CONNECTION_STRING, {
  useMongoClient: true
})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', (err) => {
  console.log(err)
})
const Schema = mongoose.Schema

const smsSchema = new Schema({
  time: { type: Date, default: Date.now },
  ip: String,
  from: String,
  to: String,
  text: String
})
const SmsModel = mongoose.model('sms', smsSchema)
const SmsModel2 = mongoose.model('sms2', smsSchema)
app.get('/_save_intent', (req, res) => {
  let from = req.query.from
  let to = req.query.to
  let text = req.query.text

  if (from && to && text) {
    from = from.replace(/^@+/, '')
    to = to.replace(/^@+/, '')
    text = text.replace(/^@+/, '')
    const sms = new SmsModel({ ip: req.connection.remoteAddress, from: from, to: to, text: text })
    sms.save((err) => {
      if (err) {
        res.sendStatus(500) // internal server error
      } else {
        res.sendStatus(200) // ok
      }
    })
  } else {
    res.sendStatus(400) // bad request
  }
})

app.get('/_get_data', (req, res) => {
  let mobile = req.query.mobile

  if (mobile) {
    mobile = mobile.replace(/^@+/, '')
    SmsModel.find({from: mobile}).sort({time: -1})
      .then((result) => {
        if (result.length > 0) {
          res.send(result[0].text)
        } else {
          res.sendStatus(404)
        }
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(400) // bad request
  }
})


app.get('/_save_intent2', (req, res) => {
  let from = req.query.from
  let to = req.query.to
  let text = req.query.text

  if (from && to && text) {
    from = from.replace(/^@+/, '')
    to = to.replace(/^@+/, '')
    text = text.replace(/^@+/, '')
    const sms2 = new SmsModel2({ ip: req.connection.remoteAddress, from: from, to: to, text: text })
    sms2.save((err) => {
      if (err) {
        res.sendStatus(500) // internal server error
      } else {
        res.sendStatus(200) // ok
      }
    })
  } else {
    res.sendStatus(400) // bad request
  }
})



app.get('/_get_data2', (req, res) => {
  let mobile = req.query.mobile

  if (mobile) {
    mobile = mobile.replace(/^@+/, '')
    SmsModel2.find({from: mobile}).sort({time: -1})
      .then((result) => {
        if (result.length > 0) {
          res.send(result[0].text)
        } else {
          res.sendStatus(404)
        }
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(400) // bad request
  }
})


app.listen(3000)
console.log('webserver started...')
