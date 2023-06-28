import { Depths, Image, ImageFit, Stack, Text } from "@fluentui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const { recipeId } = useParams();

  const recipes = useSelector((state) => state.recipes);
  const allIngredients = useSelector((state) => state.ingredients);

  const recipe = recipes.isLoading
    ? undefined
    : recipes.data.find((recipe) => recipe.id === recipeId);

  const recipeIngredients = allIngredients.isLoading
    ? []
    : allIngredients.data
        .filter((ingredient) =>
          recipe?.ingredients
            ?.map((ingredient) => ingredient.id)
            .includes(ingredient.id)
        )
        .map((ingredient) => ({
          id: ingredient.id,
          name: ingredient.name,
          quantity: recipe?.ingredients.find(
            (recipeIngredient) => recipeIngredient.id === ingredient.id
          )?.quantity,
        }));

  return (
    <Stack
      tokens={{ childrenGap: 10 }}
      styles={{ root: { padding: 10, overflowY: "auto", height: "100%" } }}
    >
      <Text variant="xxLarge">{recipe?.name}</Text>
      <Image
        src={recipe?.image}
        height={250}
        width={"100%"}
        imageFit={ImageFit.cover}
      />
      <Text>{recipe?.description}</Text>
      <Text variant="large">Ingredients</Text>
      <Stack
        tokens={{ childrenGap: 5 }}
        styles={{ root: { padding: 5, overflowY: "auto" } }}
      >
        {recipeIngredients.map((ingredient) => {
          console.log({ ingredient });

          return (
            <Stack
              key={ingredient.id}
              horizontal
              horizontalAlign="space-between"
              styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}
            >
              <Text>{ingredient.name}</Text>
              <Text>Quantity: {ingredient.quantity}</Text>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default RecipePage;
