const channels = {
  channel1: [],
  channel2: [],
  channel3: []
}
// Get all channel names
const getChannels = () => Object.keys(channels)

// Adding message to specific channel
const addMessage = (channel, message) => {
  channels[channel] = [...channels[channel], message];
  return message;
}

/// Getting all messages for specific channel
const getMessages = (channel) => {
  return channels[channel];
}

module.exports = {
  getChannels,
  addMessage,
  getMessages
}