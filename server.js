const express = require('express');
const db = require('./models');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

const port = process.env.PORT || 3000;

// ... other middleware and route setup ...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/', require('./routes'));

// Error handler (should be last middleware)
app.use(errorHandler);

db.mongoose
  .connect(db.url)
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
