const express = require('express');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlRoutes');
const { requestLogger } = require('./middleware/logger');


const app = express();
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', urlRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
