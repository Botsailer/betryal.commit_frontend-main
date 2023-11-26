import React, { useState } from "react";
import "./LoginRegister.css";
import { auth } from "../fb/fbauth";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";


export var roomid = "";
const LoginRegister = () => {
  const [addclass, setaddclass] = useState(""); 
  const [email, setEmail ] = useState('');
  const [name, setName ] = useState('');
  const [password, setPassword ] = useState('');


  const handleSignUp = async (e) => {
    e.preventDefault();
    const namev = name;
    const emailv = email;
    const passwordv = password;
    try {
      await createUserWithEmailAndPassword(auth,emailv, passwordv);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: namev })
      await sendEmailVerification(auth.currentUser);
      alert("Email verification sent. Please check your email and verify your account.");
    } catch (error) {
      if(error.code === "auth/email-already-in-use"){
        alert("Email already in use");
        setaddclass("");
      }
      console.error(error.message);
    }
   };

const handleForgotPassword = async (e) => {
e.preventDefault();
if(!email){
  alert("Please enter your email where you want to receive password reset link");
  return;
}
try{
  await sendPasswordResetEmail(auth, email);
  alert("Email sent for password reset");
}catch(error){
  console.error(error.message);
  if(error.code === "auth/user-not-found"){
    alert("No user found with this email");
    return;
  }
  alert("error sending email for password reset");
}
};

  const handleSignIn = async (e) => {
    e.preventDefault();
    const emailv = email;
    const passwordv = password;
    try {
      await signInWithEmailAndPassword(auth,emailv, passwordv);
      const user = auth.currentUser;
  
     
      if (!user.emailVerified) {
        alert("Email not verified. Please check your email and verify your account.");
        await sendEmailVerification(auth.currentUser);
        return;
      }else{
        const username = user.displayName;
        alert("Login successfull welcome "+ username );
      }
    } catch (error) {
      if(error.code === "auth/user-not-found"){
        alert("first sign up");
        setaddclass("right-panel-active");
      }
      else if(error.code === "auth/wrong-password"){
        alert("Wrong password");
      }
      console.error(error.message);
    }
    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignIn(e);
    }
  }
  return (
    <div className={`container ${addclass}`} id="container">
      <div className="form-container  sign-up-container">
        <form onSubmit={handleSignUp} >
          <h1>Create Account</h1>
          <input className="inputz" type="text" placeholder="NAME" required value = {name} onChange={(e) => setName(e.target.value)}/>
          <input className="inputz" type="email" placeholder="EMAIL" value = {email}  required onChange={(e) => setEmail(e.target.value)} />
          <input className="inputz" type="password" placeholder="PASSWORD" value = {password} required onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">REGISTER</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form  onSubmit={handleSignIn} onKeyDown={handleKeyDown}>
          <h1>Login</h1>
          <input className="inputz" type="email" placeholder="EMAIL" value={email} required onChange={(e) => setEmail(e.target.value)} />
          <input className="inputz" type="password" placeholder="PASSWORD" value={password}  required onChange={(e) => setPassword(e.target.value)} />
     
          <button  id="forgotPassword" onClick={handleForgotPassword}>forgotPassword?</button>
          <button type="submit">LOGIN</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
          
            <button
              className="ghost"
              id="signIn"
              onClick={() => setaddclass("")}>
              GO TO LOGIN
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <button
              className="ghost"
              id="signUp"
              onClick={() => setaddclass("right-panel-active")}
            >
              GO TO REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );

};

export default LoginRegister ;
