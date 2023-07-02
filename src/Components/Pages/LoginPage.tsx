import { GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../App";
import { signInWithPopup, signOut } from "firebase/auth";
import { Image, Stack } from "@fluentui/react";

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

const LoginPage = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack
      verticalAlign="center"
      horizontalAlign="center"
      styles={{ root: { height: "100vh" } }}
      tokens={{ childrenGap: 20 }}
    >
      <Image
        src={process.env.PUBLIC_URL + "logo512.png"}
        height={256}
        onClick={signInWithGoogle}
      />
    </Stack>
  );
};

export default LoginPage;
