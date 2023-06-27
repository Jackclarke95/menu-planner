import { useDispatch, useSelector } from "react-redux";

import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

export const db = getDatabase();
export const auth = getAuth();

const App = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch({
        type: "SetAuthUser",
        authUser: user,
      });
    }
  });

  return (
    <React.Fragment>
      {authUser ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/account" element={<div>Account</div>} />
          </Routes>
        </BrowserRouter>
      ) : (
        <>
          <div>Log in to see more</div>
        </>
      )}
    </React.Fragment>
  );
};

export default App;
