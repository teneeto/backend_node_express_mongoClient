const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  // const books = [
  //   {
  //     title: 'War and Peace',
  //     genre: 'historical Fiction',
  //     author: 'Lev Nikolayev',
  //     read: false,
  //   },
  //   {
  //     title: 'Les Misérables',
  //     genre: 'historical Fiction',
  //     author: 'Victor Hugo',
  //     read: false,
  //   },
  //   {
  //     title: 'Things Fall Apart',
  //     genre: 'Fiction',
  //     author: 'Chinwa Achebe',
  //     read: false,
  //   },
  //   {
  //     title: 'Homlet',
  //     genre: 'Novel',
  //     author: 'Williams Shakespere',
  //     read: false,
  //   },
  // ];

  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useUnifiedTopology: true });
          debug('connected successfully to server');
          const db = client.db(dbName);
          const col = await db.collection('books');
          const books = await col.find().toArray();
          res.render('books',
            {
              nav,
              title: 'Library',
              books,
            });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
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
