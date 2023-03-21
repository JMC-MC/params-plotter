const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const scenarioRouter = require('./routes/scenarioRoutes');
const viewRouter = require('./routes/viewRoutes');
const { importScenNonce } = require('./middleware/nonce');

// CONFIG EXPRESS
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

//MIDDLEWARE:

// Set secure HTTP request
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'script-src': [
        "'self'",
        'https://unpkg.com',
        'https://cdnjs.cloudflare.com',
        'https://cdn.jsdelivr.net',
        'https://kit.fontawesome.com',
        'https://cdn.datatables.net',
        `'nonce-${importScenNonce}'`,
        'blob:',
      ],
      'style-src': [
        "'self'",
        'https://cdn.datatables.net',
        'https://cdnjs.cloudflare.com/ajax/libs/w3-css/4.1.0/w3.css',
        'https://ka-p.fontawesome.com',
        'https://kit.fontawesome.com/60d94bcdaf.css',
      ],
      'img-src': ["'self'", 'https://cdn.datatables.net'],
      'connect-src': [
        "'self'",
        'https://cognito-idp.ap-southeast-2.amazonaws.com',
        'https://ka-p.fontawesome.com',
        'blob:',
      ],
    },
  })
);

// Rate limiting
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Rate limit exceeded, please try again later',
});
app.use('/', limiter);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Logging for development environment
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body parser
app.use(express.json({ limit: '10kb' }));

// Data sanitization for XSS
//app.use(xss());

// Cookie parser
app.use(cookieParser());

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
  )
);

//ROUTES:
app.use('/', viewRouter);
app.use('/api/v1/scenarios', scenarioRouter);
// Catch all other routes
// app.get('*', function (req, res) {
//   res.status(404).send('Page not found');
// });

module.exports = app;
