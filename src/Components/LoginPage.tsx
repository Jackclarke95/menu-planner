import { GoogleAuthProvider } from "firebase/auth";

import { auth } from "../App";
import { signInWithPopup, signOut } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const logOut = async () => {
  try {
    await signOut(auth).then(() => {
      window.location.reload();
    });
  } catch (err) {
    console.error(err);
  }
};

export const LoginPage = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logOut}>Sign out </button>
    </div>
  );
};
