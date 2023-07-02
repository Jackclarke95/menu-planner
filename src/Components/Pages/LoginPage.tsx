import { GoogleAuthProvider } from "firebase/auth";

import { firebaseAuth } from "../../App";
import { signInWithPopup, signOut } from "firebase/auth";
import { Image, Stack } from "@fluentui/react";

const googleProvider = new GoogleAuthProvider();

export const logOut = async () => {
  try {
    await signOut(firebaseAuth).then(() => {
      window.location.reload();
    });
  } catch (err) {
    console.error(err);
  }
};

const LoginPage: React.FC<{ loginAllowed: boolean }> = ({ loginAllowed }) => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
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
        height={260}
        onClick={loginAllowed ? signInWithGoogle : undefined}
        shouldStartVisible
      />
    </Stack>
  );
};

export default LoginPage;
