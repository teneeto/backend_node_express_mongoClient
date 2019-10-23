const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

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
