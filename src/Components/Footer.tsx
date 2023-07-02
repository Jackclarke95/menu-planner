import { Link, Stack, useTheme } from "@fluentui/react";

const Footer = () => {
  const theme = useTheme();

  return (
    <Stack
      horizontalAlign="center"
      styles={{
        root: {
          padding: "10px 20px",
          backgroundColor: theme.palette.neutralLight,
          position: "fixed",
          bottom: 0,
          width: "100%",
        },
      }}
    >
      <Link href="https://www.flaticon.com/free-icons/restaurant">
        Restaurant icons created by Freepik - Flaticon
      </Link>
    </Stack>
  );
};

export default Footer;
