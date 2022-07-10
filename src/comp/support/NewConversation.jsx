import React, { useState } from 'react'
import { db } from '../../firebase'
import { useContext } from 'react'
import { UserContext } from '../../App'

export default function NewConversation() {
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')

    const user = useContext(UserContext)

    const handleSubmit = async(e) => {
        e.preventDefault()

        await db.collection('details').add({
          userName,
          userId,
          currUser: user.uid
      }).then(() => {
        setUserName('')
        setUserId('')
      }).catch(err => console.log(err.message))

    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='user Id' required value={userId} onChange={e => setUserId(e.target.value)} />
        <input type="text" placeholder='user Name' value={userName} required onChange={e => setUserName(e.target.value)}/>
        <button type='submit'>create</button>
    </form>
  )
}
