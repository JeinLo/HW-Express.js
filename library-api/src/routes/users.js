// src/routes/users.js
const router = require('express').Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, borrowBook, returnBook } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:user_id', getUser);
router.post('/', createUser);
router.patch('/:user_id', updateUser);
router.delete('/:user_id', deleteUser);
router.post('/:user_id/books/:book_id', borrowBook);
router.delete('/:user_id/books/:book_id', returnBook);

module.exports = router;