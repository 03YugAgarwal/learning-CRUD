const express = require('express')
const app = express()

var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var BookSchema = require('./models/Book')

const PORT = 5000

app.get('/', (req, res) => {
    res.send('hello world')
  })

  app.listen(PORT,()=>{
    console.log(`Server has started at http://localhost:${PORT}`)
})