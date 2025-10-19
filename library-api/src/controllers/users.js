// src/controllers/users.js
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: err.message }));
};

const getUser = (req, res) => {
  const { user_id } = req.params;
  User.findById(user_id)
    .populate('books')
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const createUser = (req, res) => {
  const data = req.body;
  User.create(data)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ message: err.message }));
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const data = req.body;
  User.findByIdAndUpdate(user_id, data, { new: true, runValidators: true })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;
  User.findByIdAndDelete(user_id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted' });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const borrowBook = (req, res) => {
  const { user_id, book_id } = req.params;
  User.findByIdAndUpdate(user_id, { $addToSet: { books: book_id } }, { new: true })
    .populate('books')
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const returnBook = (req, res) => {
  const { user_id, book_id } = req.params;
  User.findByIdAndUpdate(user_id, { $pull: { books: book_id } }, { new: true })
    .populate('books')
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, borrowBook, returnBook };