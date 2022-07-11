const express = require('express')
const app = express()

var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/learningCRUD'

var Book = require('./models/Book')

const PORT = 5000

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


// Connecting Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(db);

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/books', (req, res) => {
  Book.find({})
  .exec()
  .then((books)=>{
    console.log(books);
    res.json(books);
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.post('/book',(req,res)=>{
  var newBook = new Book();
  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save((e,book)=>{
    if(e){
      res.send('error occured');
    }
    else{
      res.send(book);
    }
  })
})

app.post('/book2',(req,res)=>{
  Book.create(req.body,(err,book)=>{
    if(err){
      return
    }
    else{
      res.json({"Success": "Works"})
    }
  })
})


app.put('/book/:id',(req,res)=>{
  Book.findOneAndUpdate({
    _id:req.params.id
  },{$set: {title: req.body.title}},(e,book)=>{
    if(e){
      res.send(e)
    }else{
      res.send(book)
    }
  })
})

app.delete('/book/delete/:id',(req,res)=>{
  Book.findOneAndDelete({
    _id: req.params.id
  },(e)=>{
    if(e){
      res.send(e)
    }
    else{
      res.json({"succes": "IT WORKS"})
    }
  })
})



app.listen(PORT, () => {
  console.log(`Server has started at http://localhost:${PORT}`)
})