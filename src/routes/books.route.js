const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

//get all the books
router.get('/',booksController.getBooks);
//get book by id
router.get('/:book_id',booksController.getBook);
//create a new book
router.post('/create',booksController.createBook);
//update book
router.put('/:book_id',booksController.updateBook);
//delete book
router.delete('/:book_id',booksController.deleteBook);
module.exports = router;