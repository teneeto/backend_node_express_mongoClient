const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

function router() {
  const books = [
    {
      title: 'War and Peace',
      genre: 'historical Fiction',
      author: 'Lev Nikolayev',
      bookId: 656,
      read: false,
    },
    {
      title: 'Les Misérables',
      genre: 'historical Fiction',
      author: 'Victor Hugo',
      bookId: 24280,
      read: false,
    },
    {
      title: 'Things Fall Apart',
      genre: 'Fiction',
      author: 'Chinwa Achebe',
      bookId: 50,
      read: false,
    },
    {
      title: 'Homlet',
      genre: 'Novel',
      author: 'Williams Shakespere',
      bookId: 80,
      read: false,
    },
  ];

  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useUnifiedTopology: true });
          debug('connected successfully to server');
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
