const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database(':memory:');

// 1. SQL Injection vulnerability (CodeQL: js/sql-injection)
app.get('/api/orders', (req, res) => {
  const customerId = req.query.customerId;
  const query = "SELECT * FROM orders WHERE customer_id = '" + customerId + "'";
  db.all(query, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// 2. Command Injection vulnerability (CodeQL: js/command-line-injection)
app.post('/api/diagnostics/ping', (req, res) => {
  const host = req.body.host;
  exec('ping -c 1 ' + host, (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.send('<pre>' + stdout + '</pre>');
  });
});

// 3. Reflected Cross-Site Scripting (XSS) vulnerability (CodeQL: js/reflected-xss)
app.get('/search', (req, res) => {
  const term = req.query.q || '';
  res.send('<html><body><h1>Search results for: ' + term + '</h1></body></html>');
});

// 4. Path Traversal vulnerability (CodeQL: js/path-injection)
app.get('/api/invoice', (req, res) => {
  const fileName = req.query.file;
  const filePath = path.join(__dirname, 'invoices', fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  res.send(content);
});

// 5. Prototype Pollution merge (CodeQL: js/prototype-pollution-utility)
app.post('/api/preferences', (req, res) => {
  const defaultPrefs = { theme: 'light', notifications: true };
  const merged = _.merge({}, defaultPrefs, req.body);
  res.json(merged);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
