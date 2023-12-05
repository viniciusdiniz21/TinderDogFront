import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAB_WM6W0Syy8K_xXtf0dk4S93TeWwO_s",
  authDomain: "tindog-c0199.firebaseapp.com",
  projectId: "tindog-c0199",
  storageBucket: "tindog-c0199.appspot.com",
  messagingSenderId: "83532517174",
  appId: "1:83532517174:web:2e52193a5c532c7d782d97",
  measurementId: "G-3LX0ZS1KS2",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
