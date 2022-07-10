import React from 'react'
import {auth} from '../firebase'

export default function Signout() {
  return (
    <div>
        <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  )
}
