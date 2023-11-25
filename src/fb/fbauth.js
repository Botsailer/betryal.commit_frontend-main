
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY_Zp2sfbigNYnbtNVWQquALUr3B1uURY",
  authDomain: "spyware-a9471.firebaseapp.com",
  databaseURL: "https://spyware-a9471-default-rtdb.firebaseio.com",
  projectId: "spyware-a9471",
  storageBucket: "spyware-a9471.appspot.com",
  messagingSenderId: "144463640565",
  appId: "1:144463640565:web:0ebd312a5a50e119b212bc",
  measurementId: "G-3EXZ9Z63MQ"
};
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
export {auth, app}
