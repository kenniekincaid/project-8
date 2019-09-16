// var error = require('./views/error');
var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var logger = require('morgan');
var pug = require('pug');
var app = express();
var Sequelize = require('sequelize'); // required sequelize module
var sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


const sequelize = new Sequelize({
  dialect: 'sqlite', // the version of SQL in use.
  storage: 'library.db', // creates a database named 'library' in this project.
  logging: false // disable logging
});

(async () => {
  try { // code to be executed.
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) { // executed IF an exception is thrown by the try block; Error contains details about error.
    console.error('Error connecting to the database: ', error);
  }
}) ();

// Defining the Book Model
class Book extends Sequelize.Model {}
Book.init({
  title: Sequelize.STRING

}, { sequelize }); // same as { sequelize: sequelize }

(async () => {
  // Sync 'Books' table
  await sequelize.sync({ force: true }); // to sync all models at once.

  try {
    // Instance of the Book class represents a database row
    const book = await Book.create();
    console.log(book.toJSON());

  } catch (error) {
    console.error('Error connect to the database: ', error);
  }
}) ();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

/**LISTENER...*/
app.listen(5000, () => console.log('App listening on port 5000!'));

module.exports = app;
