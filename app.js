var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register'); 
var admin_homeRouter = require('./routes/admin-home'); 
var admin_messageRouter = require('./routes/admin-message'); 
var admin_weeklyRouter = require('./routes/admin-weekly'); 
var admin_monthlyRouter = require('./routes/admin-monthly'); 
var admin_yearlyRouter = require('./routes/admin-yearly'); 
var admin_bestRouter = require('./routes/admin-best'); 
var admin_branchRouter = require('./routes/admin-branch'); 
var admin_googleRouter = require('./routes/admin-google'); 
var orderRouter = require('./routes/order'); 
var contactusRouter = require('./routes/contactus'); 






var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', registerRouter);  
app.use('/', loginRouter); 
app.use('/', admin_homeRouter);
app.use('/', admin_messageRouter);
app.use('/', admin_weeklyRouter);
app.use('/', admin_monthlyRouter);
app.use('/', admin_yearlyRouter);
app.use('/', admin_bestRouter);
app.use('/', admin_branchRouter);
app.use('/', admin_googleRouter);
app.use('/', orderRouter);  
app.use('/', contactusRouter);  




app.get('/about', (req, res) => {
  res.render('about');
});






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the landing page
  res.status(err.status || 500);
  res.render('index');
});


module.exports = app;
