import './App.css';
import Chat from './comp/Chat';
// import Chat from './components/Chat';
import Signin from './comp/Signin';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from './firebase';
import Sidebar from './comp/Sidebar';
import { createContext, useState } from 'react';

export const UserContext = createContext()

function App() {
  const [user] = useAuthState(auth)
  const [details, setDetails] = useState([])

  console.log(details)

  return (
    <div style={{ display: 'flex' }}>
      {/* {user ? <Chat /> : <Signin />} */}

      {
        user ? 
        <UserContext.Provider value={user} >
          <div style={{ width: '30%' }} >
            <Sidebar details={details => setDetails(details)} />
            <p>Your Id : {user.uid}</p>
            <p>Your Id : {user.displayName}</p>
          </div>
          <div style={{ width: '70%'}} >
            <Chat details={details} />
          </div>
        </UserContext.Provider> : 

      <Signin />
      }
    </div>
  );
}

export default App;
