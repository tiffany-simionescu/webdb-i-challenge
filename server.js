const express = require('express');

const accountsRouter = require('./accountsRouter');

// const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Something went wrong with the server"
  })
})

server.get('/', (req, res) => {
  res.send('<h2>Welcome to DB Helpers with Knex!</h2>')
})

module.exports = server;