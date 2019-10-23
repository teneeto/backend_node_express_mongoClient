const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      // pull out username and password from req.body
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected correctly to server');
          const db = client.db(dbName);
          const col = db.collection('users');
          const user = { username, password };
          const response = await col.insertOne(user);
          debug(response);
          // create user
          req.login(response.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
      }());
    });
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
