import React, { useEffect, useState } from 'react';
import MessageEditor from './MessageEditor';

const MessageBoard = ({ currentChannel, messages, newMessage, handleChange, handleSubmit }) => {
  const renderMessages = () => {
    if (messages) {
      return messages.map((message, i) => <p key={`message-${i}`}>{message}</p>)
    }
  }

  return (
    <div className='board'>
      <h1>{currentChannel}</h1>
      {renderMessages()}
      <MessageEditor
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newMessage={newMessage}
      />
    </div>
  );
}

export default MessageBoard;