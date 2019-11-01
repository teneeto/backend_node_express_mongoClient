const express = require('express');

const bookRouter = express.Router();

const bookController = require('../src/controllers/bookController');
const bookService = require('../src/services/goodreadsService');

function router(nav) {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  // authenticaing and checking for user to give url access
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}


module.exports = router;
