import { useNavigate } from "react-router-dom";
import { Depths, Separator, Stack, Text } from "@fluentui/react";
import "./Home.scss";
import BasePage from "./BasePage";

const Home = () => {
  const navigate = useNavigate();

  const MenuLink: React.FC<{ label: string; link: string }> = ({
    label,
    link,
  }) => {
    return (
      <Text
        styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}
        onClick={() => navigate(link)}
      >
        {label}
      </Text>
    );
  };

  return (
    <BasePage pageTitle="Jemily Menu Planner">
      <Stack tokens={{ childrenGap: 10 }}>
        <MenuLink label="Recipes" link="/recipes" />
        <MenuLink label="PDF Test Page" link="/pdf-test-page" />
      </Stack>
      <Separator />
    </BasePage>
  );
};

export default Home;
