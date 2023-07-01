import { Dispatch } from "react";
import { User } from "firebase/auth";
import { Action } from "./Reducers";
import { WeeklyMealPlan, Recipe } from "./Types";

/** Interface detailing the Default Root State */
declare module "react-redux" {
  /** Default root state */
  export interface DefaultRootState {
    /** Whether the application is in Dark Mode */
    darkMode: boolean;

    /** The currently logged-in User as a Firebase User */
    authUser: User | null;

    recipes: { isLoading: true } | { isLoading: false; data: Recipe[] };

    weeklyMealPlans:
      | { isLoading: true }
      | { isLoading: false; data: WeeklyMealPlan[] };
  }

  // Declare dispatcher to take our root provider's action type
  export function useDispatch(): Dispatch<Action>;
}
