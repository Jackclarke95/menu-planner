import { User } from "firebase/auth";
import { Dispatch } from "react";
import { Action } from "./Reducers";

/** Interface detailing the Default Root State */
declare module "react-redux" {
  /** Default root state */
  export interface DefaultRootState {
    /** Whether the application is in Dark Mode */
    darkMode: boolean;

    /** The currently logged-in User as a Firebase User */
    authUser: User | null;
  }

  // Declare dispatcher to take our root provider's action type
  export function useDispatch(): Dispatch<Action>;
}
