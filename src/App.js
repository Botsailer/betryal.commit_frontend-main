import { useState, useEffect } from "react";
import LoginRegister from "./components/LoginRegister";
import DropdownMenu from "./parts/dropdown";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fb/fbauth";
import useSocket from "./server/usesocket";


function App() {
  useSocket();
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false); // Add this state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmailVerified(user.emailVerified); 
        
      } else {
        setUser(null);
        setEmailVerified(false); 
       
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const stylzer = {
    position: "fixed",
    top: "-10px",
    right: "10px",
    backgroundColor: "#10696de5",
    zIndex: "5",
  };

  return (
    <>
      <div> </div>
      <div className="App">
        {user && emailVerified ?(
          <div>
            <DropdownMenu />
            <button onClick={handleSignOut} id="btnz" style={stylzer}>
              signout
            </button>
          </div>
        ) : (
          <LoginRegister />
        )}
      </div>
    </>
  );
}

export default App;
