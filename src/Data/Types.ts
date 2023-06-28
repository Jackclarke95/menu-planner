export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  time: number;
  image?: string;
  meal: string[];
};

export type Ingredient = {
  name: string;
  quantity: number | string;
  substitutes?: Ingredient[];
  alternatives?: Ingredient[];
};
