import React from 'react'
import { useState } from 'react'
import firebase from 'firebase'
import { auth, db } from '../firebase'

export default function SendMessage() {
    const [ msg, setMsg ] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault()

        const { uid, photoURL } = auth.currentUser

        await db.collection('messages').add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
    }

  return (
    <div>
        <form onSubmit={sendMessage}>
            <input type="text" placeholder='message...' value={msg} onChange={(e) => setMsg(e.target.value)} />
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}
