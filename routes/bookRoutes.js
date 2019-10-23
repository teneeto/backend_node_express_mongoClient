const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
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
          const col = db.collection('books');
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

      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useUnifiedTopology: true });
          debug('connected successfully to server');
          const db = client.db(dbName);
          const col = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render('book', {
            nav,
            title: 'Library',
            book,
          });
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  return bookRouter;
}


module.exports = router;
