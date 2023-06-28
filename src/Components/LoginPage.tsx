import { GoogleAuthProvider } from "firebase/auth";

import { auth } from "../App";
import { signInWithPopup, signOut } from "firebase/auth";
import { Icon, PrimaryButton, Stack, Text, useTheme } from "@fluentui/react";

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
  const theme = useTheme();

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
      <Icon
        iconName="EatDrink"
        styles={{ root: { fontSize: 96, color: theme.palette.accent } }}
      />
      <Text variant="xxLargePlus">Jemily's Menu Planner</Text>
      <PrimaryButton onClick={signInWithGoogle}>
        Sign In with Google
      </PrimaryButton>
    </Stack>
  );
};

export default LoginPage;
