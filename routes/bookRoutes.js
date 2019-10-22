const express = require('express');

const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'historical Fiction',
      author: 'Lev Nikolayev',
      read: false,
    },
    {
      title: 'Les Misérables',
      genre: 'historical Fiction',
      author: 'Victor Hugo',
      read: false,
    },
    {
      title: 'Things Fall Apart',
      genre: 'Fiction',
      author: 'Chinwa Achebe',
      read: false,
    },
    {
      title: 'Homlet',
      genre: 'Novel',
      author: 'Williams Shakespere',
      read: false,
    },
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render('books', {
        nav,
        title: 'Library',
        books,
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('book', {
        nav,
        title: 'Library',
        book: books[id],
      });
    });

  return bookRouter;
}


module.exports = router;
