import React, { useState } from 'react'; 
import "../css/Navbar.css"; 

function Navbar(props){
    let app = props.app; 

    /*Modal window display*/
    let [showLogInModal,setLogInModal]= useState(false);    
    let [showRegModal,setRegModal] = useState(false);    

    let logInModalState = showLogInModal?"modal modal-display":"modal modal-none"; 
    let regModalState = showRegModal?"modal modal-display":"modal modal-none";
    /**/

    /*Registration Modal Logic */
    let [regEmailInput,setRegEmail] = useState(""); 
    let [regPassInput,setRegPass] = useState(""); 
    const RegUser = ()=>{
        app.auth().createUserWithEmailAndPassword(regEmailInput,regPassInput).catch((error)=>{
            if(error.message!==null){                
                alert(error.message);                
            } 
        })
    }
    /**/


    /*LogIn Modal Logic*/
    let [loginEmailInput,setLoginEmail] = useState(""); 
    let [loginPassInput,setLoginPass] = useState(""); 

    const LoginUser = ()=>{
        app.auth().signInWithEmailAndPassword(loginEmailInput,loginPassInput)
        .catch((error)=>{
            if(error.message!==null){
                alert(error.message); 
            } 
        })
    }
    /**/

    /*Log Out Function*/
    const LogOut = ()=>{
        app.auth().signOut().catch((error)=>{
            if(error.message!==null){
                alert(error.message);
            } 
            
        })
        window.location.reload();
    }
    /**/
    

    if(props.user===null){
     return(
        <div className="navbar">
        <nav>
            <div className="navbar-buttons">
            <button onClick={()=>{setLogInModal(true)}}>Log In</button>
            <button onClick={()=>{setRegModal(true)}}>Register</button>
            </div>

            {/* Register Modal Form*/}
            <div className={regModalState} >
            <div className="modal-body">
                 <h2>Enter Register Info</h2>

                 <h4>Enter Email</h4>
                 <input type="text" placeholder="Example username@a.com"
                 value={regEmailInput} onChange={(event)=>{setRegEmail(event.target.value)}}/>

                 <h4>Enter Password</h4>
                 <input type="password" 
                 value={regPassInput} onChange={(event)=>{setRegPass(event.target.value)}}/>
                 <div className="modal-body-buttons">
                    <button onClick={()=>{RegUser()}}>Sumbit</button>
                    <button onClick={()=>{setRegModal(false)}}>Close</button>
                 </div>
            </div>
            </div>

            {/*Log In Modal Form*/}
            <div className={logInModalState}> 
            <div className="modal-body">
                 <h2>Enter Log In info</h2>
                 <h4>Enter Email</h4>

                     <input type="text" placeholder="Example username@a.com" 
                     value={loginEmailInput} onChange={(event)=>{setLoginEmail(event.target.value)}} />

                 <h4>Enter Password</h4>
                     <input type="password" 
                     value={loginPassInput} onChange={(event)=>{setLoginPass(event.target.value)}}/> 
                 <div className="modal-body-buttons">   
                     <button onClick={()=>{LoginUser()}}>Sumbit</button>
                     <button onClick={()=>{setLogInModal(false)}}>Close</button>
                 </div>
            </div>
            </div>

        </nav>
        </div>) 
    }
    else {
        return(
        <div className="navbar">
            <nav>
                <div className="navbar-buttons">
                     <button onClick={()=>{LogOut()}}>Log Out</button>                       
                </div>  
            </nav>        
        </div>)
    }



}




export default Navbar; 