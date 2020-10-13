const express = require("express");
const helmet = require("helmet");

const authRouter = require('../auth/auth-router')
const usersRouter = require('../users/users-router')

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter)

server.get("/", (req, res) => {
  res.json({ api: "here we go with the project for today" });
});

module.exports = server;