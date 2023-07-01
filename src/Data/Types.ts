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

export type MealPlan = {
  id: string;
  date: string;
  recipes: MealPlanDay[];
};

export type MealPlanDay = {
  date: string;
  breakfast: MealPlanMeal;
  lunch: MealPlanMeal;
  dinner: MealPlanMeal;
  requirements?: {
    maxTime?: number;
  };
};

export type MealPlanMeal = {
  recipeId: string;
  isLocked: boolean;
};
