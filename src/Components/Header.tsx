import { logOut } from "./LoginPage";
import "./Header.scss";
import DataService from "../Helpers/DataService";
import { Icon, Stack, useTheme } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onClickGenerateKey = () => {
    const key = DataService.generateKey();

    navigator.clipboard.writeText(key!);

    console.log(key);
  };

  return (
    <Stack
      className="header-container"
      styles={{ root: { backgroundColor: theme.palette.accent } }}
    >
      <Icon
        iconName="EatDrink"
        styles={{ root: { fontSize: 35, color: theme.palette.themeTertiary } }}
        onClick={() => navigate("/")}
      />
      <Icon
        iconName="Lock"
        styles={{ root: { fontSize: 35, color: theme.palette.themeTertiary } }}
        onClick={onClickGenerateKey}
      />
      <Icon
        iconName="SignOut"
        styles={{ root: { fontSize: 35, color: theme.palette.themeTertiary } }}
        onClick={logOut}
      />
    </Stack>
  );
};

export default Header;
