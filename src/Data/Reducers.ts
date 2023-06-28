import produce, { Draft } from "immer";
import { Reducer } from "react";
import { DefaultRootState } from "react-redux";

/** Description of all the Actions taken that can affect the state */
export type Action =
  | { type: "SetDarkMode"; darkMode: DefaultRootState["darkMode"] }
  | {
      type: "SetAuthUser";
      authUser: DefaultRootState["authUser"];
    }
  | {
      type: "SetRecipes";
      recipes: DefaultRootState["recipes"];
    }
  | {
      type: "SetIngredients";
      ingredients: DefaultRootState["ingredients"];
    };

/** Initial application state */
export const initialState: DefaultRootState = {
  darkMode:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches,

  authUser: null,

  recipes: { isLoading: true },

  ingredients: { isLoading: true },
};

/**
 * Updates the App state from the actions
 * @param currentState - The current state of the App
 * @param action - The action to update the state
 */
export const rootReducer: Reducer<DefaultRootState, Action> = (
  currentState,
  action
): DefaultRootState =>
  produce<DefaultRootState, Draft<DefaultRootState>>(
    currentState,
    (draftState) => {
      switch (action.type) {
        // Action for toggling Dark Mode
        case "SetDarkMode": {
          draftState.darkMode = action.darkMode;

          break;
        }

        // Action for setting the Logged-in User
        case "SetAuthUser": {
          draftState.authUser = action.authUser;

          break;
        }

        // Action for setting the Recipes
        case "SetRecipes": {
          draftState.recipes = action.recipes;

          break;
        }

        // Action for setting the Ingredients
        case "SetIngredients": {
          draftState.ingredients = action.ingredients;

          break;
        }
      }
    }
  );
