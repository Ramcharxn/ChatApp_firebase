import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import Signout from './Signout'

function Chat() {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    console.log(messages)

    return (
        <div>
            <Signout />
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div style={ uid == auth.currentUser.uid ? {backgroundColor: 'red'} : {backgroundColor :'orange'} }>
                        <div key={id} style={{ display: 'flex', alignItems: 'center' }} >
                            {console.log(uid == auth.currentUser.uid)}
                            <img style={{ width: '25px', borderRadius: '50%' }} src={photoURL} alt="" />
                            <p style={{ marginLeft:'20px' }}>{text}</p>
                        </div>
                    </div>
                ))}
                <SendMessage />
        </div>
    )
}

export default Chat