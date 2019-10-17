var session = require('express-session')
const mongoose = require('mongoose')
const express = require('express')
const fs = require('fs')
const app = express()

const http = require('http')
const server = http.createServer(app)

app.use(express.static('public'))
app.use(express.urlencoded({extended: true})) 
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(session({
  secret: '12345',
  cookie: {maxAge: 1000*60*60*24 }, 
  resave: false,
  saveUninitialized: true,
}))

const indexRouter = require('./routers')
app.use('/', indexRouter)
app.get('/test', function (req, res) {
res.send({
    code: 0,
    data: 'hello vue test!'
  })
})

// if connected to mongodb
// mongoose.connect('mongodb://localhost/frontend-pm', {useNewUrlParser: true})
//   .then(() => {
//     console.log('Successfully connected to database!!!')
//     server.listen('4001', () => {
//       console.log('Successfully started server. Please visit: http://localhost:4001')
//     })
//   })
//   .catch(error => {
//     console.error('Failed to connect to database', error)
//   })

app.listen('4001', () => {console.log('Successfully started server. Please visit: http://localhost:4001')})

