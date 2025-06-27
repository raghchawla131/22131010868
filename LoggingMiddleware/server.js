const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const logFilePath = path.join(__dirname, 'logs.json');

app.post('/logs', (req, res) => {
  const log = req.body;
  console.log('Received log:', log);

  let logs = [];
  if (fs.existsSync(logFilePath)) {
    logs = JSON.parse(fs.readFileSync(logFilePath));
  }
  logs.push(log);
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));

  res.status(200).json({ message: 'log created successfully' });
});

app.listen(4000, () => {
  console.log('LoggingMiddleware running on port 4000');
});
