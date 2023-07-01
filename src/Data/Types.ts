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
  recipes: {
    monday: MealPlanDay;
    tuesday: MealPlanDay;
    wednesday: MealPlanDay;
    thursday: MealPlanDay;
    friday: MealPlanDay;
    saturday: MealPlanDay;
    sunday: MealPlanDay;
  };
};

type MealPlanDay = {
  breakfast: MealPlanMeal;
  lunch: MealPlanMeal;
  dinner: MealPlanMeal;
  requirements?: {
    maxTime?: number;
  };
};

type MealPlanMeal = {
  id: string;
  isLocked: boolean;
};
