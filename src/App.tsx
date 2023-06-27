import { useDispatch, useSelector } from "react-redux";

import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Components/LoginPage";
import Header from "./Components/Header";
import DataService from "./Helpers/DataService";
import Recipes from "./Components/Recipes";
import Home from "./Components/Home";

export const firebaseConfig = {
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

  onValue(ref(db, "recipes"), (snapshot) => {
    const recipeData = snapshot.val();

    const recipes = Object.keys(recipeData).map((key) => {
      const recipe = recipeData[key];
      recipe.id = key;

      return recipe;
    });

    dispatch({
      type: "SetRecipes",
      recipes: {
        isLoading: false,
        data: recipes,
      },
    });
  });

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch({
        type: "SetAuthUser",
        authUser: user,
      });
    }
  });

  console.log(authUser);

  return (
    <React.Fragment>
      {authUser ? (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<div>Account</div>} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </React.Fragment>
  );
};

export default App;
