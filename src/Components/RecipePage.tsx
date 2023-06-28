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
import { Ingredient } from "../Data/Types";
import { Icon } from "@fluentui/react/lib/Icon";

const RecipePage = () => {
  const { recipeId } = useParams();

  const recipes = useSelector((state) => state.recipes);

  const recipe = recipes.isLoading
    ? undefined
    : recipes.data.find((recipe) => recipe.id === recipeId);

  return (
    <Stack
      tokens={{ childrenGap: 10 }}
      styles={{ root: { padding: 10, overflowY: "auto", height: "100%" } }}
    >
      <Text variant="xxLarge">{recipe?.name}</Text>
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
      <Stack
        tokens={{ childrenGap: 5 }}
        styles={{ root: { padding: 5, overflowY: "auto" } }}
      >
        {recipe?.ingredients.map((ingredient, index) => {
          return <IngredientsCard ingredient={ingredient} index={index} />;
        })}
      </Stack>
    </Stack>
  );
};

const IngredientsCard = ({ ingredient, index }) => {
  const [expandSubstitutes, setExpandSubstitutes] = useState<boolean>(false);

  const toggleExpandSubstitutes = () => {
    setExpandSubstitutes(!expandSubstitutes);
  };

  return (
    <Stack
      key={index}
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
