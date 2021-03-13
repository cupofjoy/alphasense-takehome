// const db = require('../db/db');
const {
  getChannels,
  addMessage,
  getMessages
} = require('../db/database');
const messageController = {};

messageController.getChannels = (req, res, next) => {
  // since database is an object with channel names as a key,
  // using Object.keys to get an array of all channel names
  res.locals.channels = getChannels();
  return next();
}

messageController.getMessages = (req, res, next) => {
  const channel = getMessages(req.params.channel);

  /* 
    Check if channel exists. 
    If no channel with that name is not found, send to global error handler
  */
  if (!channel) {
    return next({
      log: 'No channel found. Cannot get messages',
      status: 404,
      message: {
        error: 'Incorrect channel. Try another channel.'
      }
    })
  }

  /* Channel found. Send messages */
  res.locals.messages = channel;
  return next();
}

messageController.postMessage = (req, res, next) => {
  const channels = getChannels();

  /* 
    Check if channel exists. 
    If no channel with that name is not found, send to global error handler
  */
  if (!channels.includes(req.params.channel)) {
    return next({
      log: 'No channel found. Cannot get messages',
      status: 404,
      message: {
        error: 'Incorrect channel. Try another channel.'
      }
    })
  }

  /* Channel found in database. Add new message to database */
  console.log('adding message')
  const message = addMessage(req.params.channel, req.body.message)

  console.log('message', message)
  /* Send new message back */
  res.locals.message = message;
  return next();
}

module.exports = messageController;