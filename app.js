const express = require('express');

// Allows us set color on our error or console messages
const chalk = require('chalk');

// debug runs only when you're running in debug mode,
// It won't spill anything to console when project is deployed
const debug = require('debug')('app');

// log to the console anything that has to do with web traffic
const morgan = require('morgan');

const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];

// helps us chain all of our routes
const bookRouter = require('./routes/bookRoutes')(nav);

// use "combined" for much info and "tiny" for less info
app.use(morgan('tiny'));

// telling express to serve static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, './node_modules/jquery/dist')));

// to set our views directory and view engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);

// render our view in this case pug
app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' },
    ],
    title: 'Library',
  });
});

// sending response when requested from a browser
app.get('/test', (req, res) => {
  res.send('Hello from My Library app');
});

// serving up files (e.g index.html)
app.get('/index', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`); // if you miss the "/" before 'views', you'll have issues
});

// path.join helps eliminate "concatenation" and and the "/" before and after 'views'
app.get('/index2', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
