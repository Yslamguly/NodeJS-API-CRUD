const BooksModel = require('../models/books.model');
const {response} = require("express");
const Books = require("../models/books.model");
//get all the books
exports.getBooks = (req, res)=>{
    //console.log('All the books');
    BooksModel.getAllBooks((err,books)=>{
        if(err){
            res.send(err);
        }
        else
        {
            console.log('Books',books)
            res.send(books);
        }
    })
}

//get a book by id
exports.getBook=(req,res)=>{
    //console.log('Get book by id')
    BooksModel.getBook(req.params.book_id,(err,book)=>{
        if(err){
            res.send(err);
        }
        else if(book.length===0){
            res.send('No such book');
        }
        else{
            console.log(book);
            res.send(book);
        }
    })
}
//create a new book
exports.createBook = (req,res)=>{
    const book_req_data = req.body;
    console.log('BookReqData',book_req_data);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success:false,message:'Please all the fields'})
    }
    else{
        BooksModel.createBook(book_req_data,(err,book)=>{
            if(err){
                res.send(err);
            }
            res.json({status:true,message:"Book has been added successfully",data:book})
        })
    }
}
//update a book
exports.updateBook=(req,res)=>{
    const book_req_data = new Books(req.body);
    console.log(`Book with id ${req.params.book_id} has been updated. {name: ${book_req_data.name}, price: ${book_req_data.price}}`);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success:false,message:'Please fill all the fields'})
    }
    else{
        BooksModel.updateBook(req.params.book_id,book_req_data,(err,book)=>{
            if(err){
                res.send(err);
            }
            res.json({status:true,message:"Book has been updated successfully",data:book})
        })
    }
}

//delete book
exports.deleteBook=(req,res)=>{
    BooksModel.deleteBook(req.params.book_id,(err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json({success:true,message:'Book has been deleted.'});
        }
    })
}