const express = require('express');
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register New User
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Unable to register user." });
    }

    if (!isValid(username)) {
        return res.status(404).json({ message: "User already exists!" });
    }

    users.push({ username, password });

    return res.status(200).json({
        message: "User successfully registered. Now you can login."
    });
});

// Get all books
public_users.get("/", (req, res) => {
    return res.status(200).json(books);
});

// Get book by ISBN
public_users.get("/isbn/:isbn", (req, res) => {
    return res.status(200).json(books[req.params.isbn]);
});

// Get books by Author
public_users.get("/author/:author", (req, res) => {

    const author = req.params.author.toLowerCase();
    let filteredBooks = {};

    for (let key in books) {
        if (books[key].author.toLowerCase() === author) {
            filteredBooks[key] = books[key];
        }
    }

    return res.status(200).json(filteredBooks);
});

// Get books by Title
public_users.get("/title/:title", (req, res) => {

    const title = req.params.title.toLowerCase();
    let filteredBooks = {};

    for (let key in books) {
        if (books[key].title.toLowerCase() === title) {
            filteredBooks[key] = books[key];
        }
    }

    return res.status(200).json(filteredBooks);
});

// Get Book Review
public_users.get("/review/:isbn", (req, res) => {

    return res.status(200).json(books[req.params.isbn].reviews);

});

// Task 10

// Get all books – Async/Await
// Get all books – Async/Await
async function getAllBooks() {
    try {
        const response = await axios.get("http://localhost:5000/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Get book by ISBN – Promise
function getBookByISBN(isbn) {
    return axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => response.data);
}

// Get books by Author – Promise
function getBooksByAuthor(author) {
    return axios.get(`http://localhost:5000/author/${author}`)
        .then(response => response.data);
}

// Get books by Title – Promise
function getBooksByTitle(title) {
    return axios.get(`http://localhost:5000/title/${title}`)
        .then(response => response.data);
}

module.exports.general = public_users;