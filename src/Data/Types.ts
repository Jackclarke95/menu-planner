export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: {
    name: string;
    quantity: number | string;
    substitutes?: { name: string; quantity?: number | string }[];
  }[];
  time: number;
  image?: string;
};

export type Ingredient = {
  name: string;
  quantity: number | string;
  substitutes?: Ingredient[];
};
