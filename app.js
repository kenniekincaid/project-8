// const error = require('./views/error');
const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const bodyParser = require('body-parser');
const logger = require('morgan');
const pug = require('pug');
// const Sequelize = require('sequelize'); // required sequelize module

// const sequelize = new Sequelize({
//   dialect: 'sqlite', // the version of SQL in use.
//   storage: 'library.db', // creates a database named 'library' in this project.
//   logging: false // disable logging
// });

// (async () => {
//   try { // code to be executed.
//     await sequelize.authenticate();
//     console.log('Connection to the database successful!');
//   } catch (error) { // executed IF an exception is thrown by the try block; Error contains details about error.
//     console.error('Error connecting to the database: ', error);
//   }
// }) ();

/**DEFINE BOOK MODEL */
// class Book extends Sequelize.Model {}
// Book.init({
//   title: Sequelize.STRING
// }, { sequelize }); // same as { sequelize: sequelize }

// (async (req, res) => {
//   // Sync 'Books' table
//   await sequelize.sync({ force: true }); // to sync all models at once.
//   try {
//     // Instance of the Book class represents a database row
//     const book = await Book.create();
//     console.log(book.toJSON());
//   } catch (error) {
//     console.error('Error connect to the database: ', error);
//   }
// }) ();


/**MIDDLEWARE SECTION, ENGINE SETUP */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser());

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
