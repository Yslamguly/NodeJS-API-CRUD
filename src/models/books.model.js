const dbConnection = require('../../config/db.config')

let Books = function(books){
    this.book_id = books.book_id
    this.name = books.name;
    this.price = books.price;
}

//Get all books
Books.getAllBooks = (result) => {
    dbConnection.query("SELECT * FROM books",(err,res) => {
        if(err){
            console.log('Error while fetching books',err);
            result(null,err);
        }else{
            console.log('Books fetched successfully');
            result(null,res);
        }
    })
}

//get book by id from db
Books.getBook=(book_id,result)=>{
    dbConnection.query("SELECT * FROM books WHERE book_id=?",book_id,(err,res)=>{
        if(err){
            console.log('Error while fetching the data ', err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

//add new book
Books.createBook = (bookReqData, result)=>{
    dbConnection.query("INSERT INTO books SET ? ", bookReqData, (err,res)=>{
        if(err){
            console.log("Error while inserting data");
            result(null,err);
        }else{
            console.log("Book was added successfully");
            result(null,res)
        }
    })
}
//Update book
Books.updateBook=(book_id,bookReqData,result)=> {
    dbConnection.query("UPDATE books SET name=?,price=? WHERE book_id=?", [bookReqData.name, bookReqData.price, book_id], (err, res) => {
        if (err) {
            console.log("Error while updating the record");
            result(null, err);
        } else {
            console.log("Book has been updated");
            result(null, res);
        }
    });
}

//Delete book
Books.deleteBook=(book_id,result)=>{
    dbConnection.query("DELETE FROM books WHERE book_id=?",[book_id],(err,res)=>{
        if(err){
            console.log('Error while deleting the book')
            result(null,err)
        }else{
            result(null,res);
        }
    })
}

module.exports = Books;