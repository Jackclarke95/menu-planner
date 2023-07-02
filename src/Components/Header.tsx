import { useNavigate } from "react-router-dom";
import { logOut } from "./Pages/LoginPage";
import { Icon, Image, Stack, useTheme } from "@fluentui/react";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onClickHomeIcon = () => {
    navigate("/");
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
          position: "fixed",
          top: 0,
          width: "100%",
        },
      }}
    >
      <Icon
        iconName="Back"
        styles={{ root: { fontSize: 35, color: theme.palette.themeTertiary } }}
        onClick={() => window.history.back()}
      />
      <Image
        src={process.env.PUBLIC_URL + "logo192.png"}
        height={32}
        onClick={onClickHomeIcon}
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
