import React, {useState} from 'react'
import { useEffect } from 'react'
import { auth, db } from '../firebase'
import Signout from './Signout'
import firebase from 'firebase'

export default function Chat() {
  const [text, setText] = useState('')

  const { photoURL, uid } = auth.currentUser
  const val = localStorage.getItem('FireChat-contact')
  
  var userName, userId
  
  if (val !== null){
    [userName, userId] = val.split(',')
  }


  const [ messageList, setMessageList ] = useState([])

  const handleSubmit = async(e) => {
    e.preventDefault()

    await db.collection('messages').add({
      text,
      photoURL,
      uid,
      userId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => console.log('added')).catch(err => console.log(err.message))
    
    db.collection('messages').orderBy('createdAt').onSnapshot(snapshot => {
      setMessageList(snapshot.docs.map(doc => {
        if((doc.data().userId === userId && doc.data().uid === uid) || (doc.data().userId === uid && doc.data().uid === userId)){
          return doc.data()
        } 
      }))
    })
    setText('')
  }

  useEffect(() => {
    db.collection('messages').orderBy('createdAt').onSnapshot(snapshot => {
      setMessageList(snapshot.docs.map(doc => {
        if((doc.data().userId === userId && doc.data().uid === uid) || (doc.data().userId === uid && doc.data().uid === userId)){
          return doc.data()
        } 
      }))
    })
  },[])

  return (
    <div>
      <Signout />

      {userName}

      {
        val == null ?
        <p>
          welcome to ramChat
        </p> :
        <div>
          {
          messageList.map((mess, index) => {
            if (mess !== undefined){
              return <div key={index} style={ mess.userId == auth.currentUser.uid ? {backgroundColor: 'red'} : {backgroundColor :'orange'}  }>
                <div style={{ display: 'flex', alignItems: 'center', marginTop:'10px' }}>
                  <img style={{ width: '25px', borderRadius: '50%' }} src={mess.photoURL} alt="" />
                  <p style={{ marginLeft:'20px' }}>{mess.text}</p>
                </div>
              </div>
            }
          })
        }
        
  
        <form onSubmit={handleSubmit}>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type here"  />
          <button type="submit">Send</button>
        </form>
        </div>
      }

    </div>
  )
}
