import { useDispatch, useSelector } from "react-redux";

import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Header from "./Components/Header";
import Recipes from "./Components/RecipeList";
import Home from "./Components/Home";
import RecipePage from "./Components/RecipePage";
import PdfTestPage from "./Components/PdfTestPage";
import Footer from "./Components/Footer";
import { Stack } from "@fluentui/react";
import MealPlanList from "./Components/MealPlanList";
import MealPlanPage from "./Components/MealPlanPage";

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

  onValue(ref(db, "mealPlans"), (snapshot) => {
    const mealPlanData = snapshot.val();

    const mealPlans = Object.keys(mealPlanData).map((key) => {
      const mealPlan = mealPlanData[key];
      mealPlan.id = key;

      return mealPlan;
    });

    dispatch({
      type: "SetMealPlans",
      mealPlans: {
        isLoading: false,
        data: mealPlans,
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

  return (
    <Stack verticalFill>
      {authUser ? (
        <BrowserRouter>
          <Header />
          <Stack verticalFill>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:recipeId" element={<RecipePage />} />
              <Route path="/pdf-test-page" element={<PdfTestPage />} />
              <Route path="/meal-plans" element={<MealPlanList />} />
              <Route
                path="/meal-plans/:mealPlanId"
                element={<MealPlanPage />}
              />
            </Routes>
          </Stack>
          <Footer />
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </Stack>
  );
};

export default App;
