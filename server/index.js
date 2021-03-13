const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const messageController = require('./controllers/messageController');

/* MIDDLEWARES */
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  console.log('***********************************');
  console.log(`REQUEST URL:     ${req.url}`);
  console.log(`REQUEST METHOD:  ${req.method}`);
  console.log('***********************************');
  return next();
});

/* ROUTE ENDPOINTS */
/*
 * ROUTE: /api/channels
 * METHOD: GET
 * @INFO: GET ALL CHANNELS
 */
app.get('/api/channels', messageController.getChannels, (req, res) => {
  return res.status(200).json({
    channels: res.locals.channels
  })
});

/*
 * ROUTE: /api/messages/<channel>
 * METHOD: GET
 * @INFO: GET ALL MESSAGES FOR SPECIFIC CHANNEL
 */
app.get('/api/messages/:channel', messageController.getMessages, (req, res) => {
  return res.status(200).json({
    messages: res.locals.messages
  })
})

/*
 * ROUTE: /api/:channel
 * METHOD: POST
 * @INFO: post message to channel
 */
app.post('/api/:channel', messageController.postMessage, (req, res) => {
  return res.status(200).json({
    newMessage: res.locals.message
  })
})

/*
 * ROUTE: /
 * METHOD: GET
 * @INFO: SERVE HTML FILE
 */
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

/* GLOBAL ERROR HANDLER */
app.use((err, req, res, next) => {
  const errObj = {
    log: err.log || 'Error in server',
    status: err.status || 400,
    message: err.message || {
      error: 'Server error. Please try again.'
    }
  };

  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
})

app.listen(port, () => console.log(`Server running on port ${port}`))