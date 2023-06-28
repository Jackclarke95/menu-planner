export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: {
    id: string;
    quantity: number | string;
    substitutes: { id: string; quantity?: number | string }[];
  }[];
  time: number;
  image?: string;
};

export type Ingredient = {
  id: string;
  name: string;
};

export type RecipeIngredient = {
  id: string;
  recipeId: string;
  ingredientId: string;
  quantity: number;
  substitute?: { id: string; quantity: number };
};
