import { Link } from "react-router-dom";
import {
  PrimaryButton,
  Separator,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";
import "./Home.scss";
import { useState } from "react";
import DataService from "../Helpers/DataService";

const Home = () => {
  const [ingredient, setIngredient] = useState<string | undefined>(undefined);

  const onChangeIngredientName = (_, newValue?: string | undefined) => {
    setIngredient(newValue);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSaveIngredient();
    }
  };

  const onSaveIngredient = () => {
    if (ingredient) {
      DataService.addIngredient(ingredient);

      setIngredient(undefined);
    }
  };

  return (
    <Stack styles={{ root: { paddingRight: 10, paddingLeft: 10 } }}>
      <Text variant="xxLarge">Home</Text>
      <Stack>
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/account">Account</Link>
      </Stack>
      <Separator />
      <Stack tokens={{ childrenGap: 10 }}>
        <Text variant="large">Add Ingredient</Text>
        <TextField
          label="Name"
          onChange={onChangeIngredientName}
          value={ingredient}
          onKeyDown={onKeyDown}
        />
        <PrimaryButton
          text="Save"
          onClick={onSaveIngredient}
          disabled={!ingredient}
        />
      </Stack>
    </Stack>
  );
};

export default Home;
