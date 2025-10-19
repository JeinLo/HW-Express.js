// src/controllers/books.js
const Book = require('../models/book');

const getBooks = (req, res) => {
  Book.find({})
    .then(books => res.status(200).json(books))
    .catch(err => res.status(500).json({ message: err.message }));
};

const getBook = (req, res) => {
  const { book_id } = req.params;
  Book.findById(book_id)
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json(book);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const createBook = (req, res) => {
  const data = req.body;
  Book.create(data)
    .then(book => res.status(201).json(book))
    .catch(err => res.status(500).json({ message: err.message }));
};

const updateBook = (req, res) => {
  const { book_id } = req.params;
  const data = req.body;
  Book.findByIdAndUpdate(book_id, data, { new: true, runValidators: true })
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json(book);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const deleteBook = (req, res) => {
  const { book_id } = req.params;
  Book.findByIdAndDelete(book_id)
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json({ message: 'Book deleted' });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };