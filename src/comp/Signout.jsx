import React from 'react'
import { auth } from '../firebase'

export default function Signout() {

  const handleSignout = () => {
    auth.signOut()
    localStorage.removeItem('FireChat-contact')
  }

  return (
    <div>
        <button onClick={handleSignout}>sign out</button>
    </div>
  )
}
