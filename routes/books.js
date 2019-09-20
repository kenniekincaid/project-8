var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Books = require("../models/book");

/* 1 - ALL BOOKS GET ROUTE */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books){
    res.render("index", {books: books, title: "All Books" });
  }).catch(function(error){
      next(error);
   });
});

/* 2 - NEW BOOK GET ROUTE */
router.get('/new', function(req, res, next) {
  res.render("new_book", {book: Book.build(), title: "New Book"});
});

/* 3 & 4 - NEW BOOK POST ROUTE ===> BOOK ROUTE  */
router.post('/new', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    if(book)
      // console.log(book);
    res.redirect("/books/" + book.id);
  }).catch(function(error){
    // console.log("An error has occured!")
    // console.log(error);
      if(error.name === "SequelizeValidationError") {
        res.render("form-error", {book: Book.build(req.body), errors: error.errors, title: "New Book"})
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
;});

/* 5 - ID GET ROUTE */
router.get("/:id", function(req, res, next){
  Book.findByPk(req.params.id)
    .then(function(book){
      if(book) {
        res.render("book_detail", {book: book, title: book.title});  
      } else {
        res.render("page_not_found");
      }
  }).catch(function(error){
      res.send(500, error);
   });
});

/* 6 - ID POST ROUTE */
router.post("/:id", function(req, res, next){
  Book.findByPk(req.params.id).then(function(book){
    if(book) {
      return book.update(req.body);
    } else {
      res.send(400);
    }
  }).then(function(book){
    res.redirect("/books/" + book.id);     
  }).catch(function(error){
    console.log("error.update");
    console.log(error);
      if(error.name === "SequelizeValidationError") {
        var book = Book.build(req.body);
        book.id = req.params.id;
        res.render("form-error", {book: book, errors: error.errors, title: "Update Book"})
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
});

/* 7 - ID DELETE ROUTE */
router.post("/:id/delete", function(req, res, next){
  Book.findByPk(req.params.id).then( async function(book){  
    if(book) {
      await book.destroy();
      res.redirect('/books');
    } else {
      res.send(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

module.exports = router;