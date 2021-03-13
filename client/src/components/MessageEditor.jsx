import React, { useState } from 'react'

function MessageEditor({ handleChange, handleSubmit, newMessage }) {
  return (
    <div className='message-editor'>
      <form onSubmit={handleSubmit} >
        <input type='text' value={newMessage} onChange={handleChange} placeholder='New Message' />
        <button type='submit' disabled={!newMessage} >Add Message</button>
      </form>
    </div>
  )
}

export default MessageEditor;