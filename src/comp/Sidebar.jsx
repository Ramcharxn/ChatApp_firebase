import React from 'react'
import { useContext, useState } from 'react'
import NewConversation from './support/NewConversation'
import { UserContext } from '../App'
import { useEffect } from 'react'
import { db } from '../firebase'

export default function Sidebar() {
  const user = useContext(UserContext)
  const [ contactList, setContactList ] = useState([])

  const handleClick = (contact) => {
    localStorage.setItem('FireChat-contact',[contact.userName, contact.userId])
    // console.log(chatId)
  }

  useEffect(() => {
    // db.collection('details').onSnapshot(snapshot => {
    //   (snapshot.docs.map(doc => {
    //     if(user.uid === doc.data().currUser){
    //       setContactList(...prev => prev, doc.data().userName)
    //     }
    //   }))
    // })

    db.collection('details').onSnapshot(snapshot => {
      setContactList(snapshot.docs.map(doc => {
        if(doc.data().currUser === user.uid) {
          return doc.data()
        } 
      }))
    })

  },[])

  return (
    <div>
        {contactList.length !== 0 && contactList.map((contact, index) => (
          <div key={index}>
            { contact !== undefined ? <button onClick={() => handleClick(contact)}>{contact.userName}</button> : null }
          </div>
        ))}
        <NewConversation />
    </div>
  )
}
