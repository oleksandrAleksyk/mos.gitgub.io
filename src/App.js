import React,{useState, useEffect} from 'react';
import Navbar from './components/Navbar'; 
import Feed from './components/Feed'; 
import firebase from 'firebase'; 


var firebaseConfig = {
  apiKey: "AIzaSyC70AYUTqJRnWPS3gIa6Wrk-6XP6pS1mi4",
  authDomain: "moslab-fad89.firebaseapp.com",
  projectId: "moslab-fad89",
  storageBucket: "moslab-fad89.appspot.com",
  messagingSenderId: "289142634149",
  appId: "1:289142634149:web:5e1e78462f2aa002eb7f4c"
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);






function App() { 
  let [user,setUser] = useState();
  app.auth().onAuthStateChanged((user)=>{setUser(user)})
  if(user===null){
    let userState = false;
    return(
      <div>
         <Navbar app={app} user={user}/>  
         <Feed app={app} user={user} />      
      </div>
    ) 
  } else {
    let userState = true; 
    return(      
      <div>
         <Navbar app={app} user={user}/>  
         <Feed app={app} user={user} />       
      </div>
    )
  }
}

export default App;
