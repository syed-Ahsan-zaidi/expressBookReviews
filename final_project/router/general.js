const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Task 10: Get all books using Async/Await
public_users.get('/', async function (req, res) {
    try {
        const getBooks = new Promise((resolve, reject) => {
            resolve(books);
        });
        const allBooks = await getBooks;
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
    const getBook = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
    });

    getBook.then((book) => res.status(200).json(book))
           .catch((err) => res.status(404).json({ message: err }));
});

// Task 12: Get book details based on author using Promises
public_users.get('/author/:author', function (req, res) {
    const getByAuthor = new Promise((resolve, reject) => {
        const author = req.params.author;
        let filteredBooks = Object.values(books).filter(b => b.author === author);
        resolve(filteredBooks);
    });

    getByAuthor.then((data) => res.status(200).json(data));
});

// Task 13: Get all books based on title using Promises
public_users.get('/title/:title', function (req, res) {
    const getByTitle = new Promise((resolve, reject) => {
        const title = req.params.title;
        let filteredBooks = Object.values(books).filter(b => b.title === title);
        resolve(filteredBooks);
    });

    getByTitle.then((data) => res.status(200).json(data));
});

module.exports.general = public_users;
