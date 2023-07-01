import { logOut } from "./Pages/LoginPage";
import DataService from "../Helpers/DataService";
import { Icon, Stack, useTheme } from "@fluentui/react";

const Header = () => {
  const theme = useTheme();

  const onClickGenerateKey = () => {
    const key = DataService.generateKey();

    navigator.clipboard.writeText(key!);

    console.log(key);
  };

  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      styles={{
        root: {
          padding: "10px 20px",
          height: 60,
          backgroundColor: theme.palette.accent,
        },
      }}
    >
      <Icon
        iconName="Back"
        styles={{ root: { fontSize: 35, color: theme.palette.themeTertiary } }}
        onClick={() => window.history.back()}
      />
      {window.location.hostname === "localhost" && (
        <Icon
          iconName="Lock"
          styles={{
            root: { fontSize: 35, color: theme.palette.themeTertiary },
          }}
          onClick={onClickGenerateKey}
        />
      )}
      <Icon
        iconName="SignOut"
        styles={{ root: { fontSize: 35, color: theme.palette.themeTertiary } }}
        onClick={logOut}
      />
    </Stack>
  );
};

export default Header;
