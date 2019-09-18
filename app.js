const express = require('express');
const app = express();
const model = require('./models/book').sequelize;
  // module.exports = (app, data) => {
  //   console.log(books);
  //   app.get("/all_books", (req, res) => {
  //     data.post.findAll().then((result) => res.json(result))
  //   });
  // } 
const path = require('path');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const bodyParser = require('body-parser');
const logger = require('morgan');
const pug = require('pug');

/**MIDDLEWARE SECTION, ENGINE SETUP */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false})); //error msg: body-parser deprecated; se urlencoded middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**ROUTES SECTION */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/books', booksRouter);

/**ERROR HANDLING SECTION */
  // catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error("PAGE NOT FOUND");
  error.status = 404;
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
