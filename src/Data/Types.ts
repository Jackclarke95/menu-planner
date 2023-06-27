export type Recipe = {
  id: string;
  name: string;
  description: string;
  time: number;
};

export type Ingredient = {
  id: string;
  name: string;
  diet: number[];
  allergens: number[];
};

export type Diet = {
  id: number;
  name: string;
};
