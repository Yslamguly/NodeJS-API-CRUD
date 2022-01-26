const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
//create express app
const app = express();

//setup the server port and host
const port = process.env.PORT || 5000;
const host = process.env.HOST ?? 'localhost';
const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title: "Books API",
            version: "1.0.0",
            description: "API for managing books",
        },
        servers: [
            {
                url: `http://${host}:${port}`,
            },
        ],
    },
    apis: ["*.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

//parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended:false}));

//parse request data content type application/json
app.use(bodyParser.json());


//Import books routes
const bookRoutes = require('./src/routes/books.route');
//create book routes
app.use('/books',bookRoutes);







//listen to the port
app.listen(port,()=>{
    console.log(`Express  Server is running at: ${port}`)
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Book name
 *         price:
 *           type: number
 *           description: Book price
 *       example:
 *         name: Winnie The Pooh
 *         price: 300
 */

/**
 * @swagger
 * /books:
 *   get:
 *     description: Returns the list of all the books
 *     responses:
 *       '200':
 *         description: Successfully returned a list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 #  ----- Added line  ----------------------------------------
 *                 $ref: '#/components/schemas/Books'
 *                 #  ---- /Added line  ----------------------------------------
 *       '400':
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /books/{book_id}:
 *   get:
 *     description: Obtain information about an book from id
 *     parameters:
 *       - name: book_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       '200':
 *         description: Successfully returned a book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *
 *       '400':
 *         description: Invalid request
 *         content:
 *           applicati on/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /books/{book_id}:
 *   delete:
 *     description: Delete a book by id
 *     parameters:
 *       - name: book_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       '200':
 *         description: Successfully removed the book
 *       '400':
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /books/create:
 *   post:
 *     description: Lets a user post a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             #  ----- Added line  ----------------------------------------
 *             $ref: '#/components/schemas/Books'
 *             #  ---- /Added line  ----------------------------------------
 *     responses:
 *       '200':
 *         description: Successfully created a new book
 *       '400':
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /books/{book_id}:
 *  put:
 *   summary: update book
 *   description: update book
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: book_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the book
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *        $ref: '#/components/schemas/Books'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/Books'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *         $ref: '#/components/schemas/Books'
 */

