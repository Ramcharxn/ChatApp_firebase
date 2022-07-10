import React from 'react'
import firebase from 'firebase'
import { auth } from '../firebase'

export default function Signin() {
    const handleSignUp = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

  return (
    <div>
        <button onClick={handleSignUp}>signin with google</button>
    </div>
  )
}
