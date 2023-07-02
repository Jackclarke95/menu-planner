import {
  Depths,
  Image,
  ImageFit,
  Separator,
  Stack,
  Text,
} from "@fluentui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Ingredient } from "../../Data/Types";
import { Icon } from "@fluentui/react/lib/Icon";
import BasePage from "./BasePage";

const RecipePage = () => {
  const { recipeId } = useParams();

  const recipes = useSelector((state) => state.recipes);

  const recipe = recipes.isLoading
    ? undefined
    : recipes.data.find((recipe) => recipe.id === recipeId);

  return (
    <BasePage pageTitle={recipe?.name ?? ""}>
      {recipe?.image && (
        <Image
          src={recipe?.image}
          height={250}
          width={"100%"}
          imageFit={ImageFit.cover}
        />
      )}
      <Text>{recipe?.description}</Text>
      <Separator styles={{ root: { fontSize: "larger" } }}>
        Ingredients
      </Separator>
      <Stack tokens={{ childrenGap: 5 }} styles={{ root: { padding: 5 } }}>
        {recipe?.ingredients.map((ingredient, index) => {
          return <IngredientsCard ingredient={ingredient} key={index} />;
        })}
      </Stack>
    </BasePage>
  );
};

const IngredientsCard = ({ ingredient }) => {
  const [expandSubstitutes, setExpandSubstitutes] = useState<boolean>(false);

  const toggleExpandSubstitutes = () => {
    setExpandSubstitutes(!expandSubstitutes);
  };

  return (
    <Stack
      onClick={toggleExpandSubstitutes}
      styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}
      tokens={{ childrenGap: 5 }}
    >
      <Stack horizontal horizontalAlign="space-between">
        <Text>
          {ingredient.name}
          {ingredient.substitutes && ingredient.substitutes.length > 0 && (
            <Icon
              iconName="Switch"
              styles={{ root: { fontSize: "smaller", paddingLeft: 5 } }}
            />
          )}
        </Text>
        <Text> {ingredient.quantity}</Text>
      </Stack>
      {ingredient.substitutes &&
        ingredient.substitutes.length > 0 &&
        expandSubstitutes && (
          <>
            {ingredient.substitutes.map(
              (substitute: Ingredient, index: number) => {
                return (
                  <Stack horizontal horizontalAlign="space-between" key={index}>
                    <Text variant="small">{substitute.name}</Text>
                    <Text variant="small">
                      {substitute.quantity ?? ingredient.quantity}
                    </Text>
                  </Stack>
                );
              }
            )}
          </>
        )}
    </Stack>
  );
};

export default RecipePage;
