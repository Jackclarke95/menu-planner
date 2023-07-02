import { MealType } from "./Enums";

export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  time: number;
  image?: string;
  mealType: MealType[];
};

export type Ingredient = {
  name: string;
  quantity: number | string;
  substitutes?: Ingredient[];
  alternatives?: Ingredient[];
};

export type WeeklyMealPlan = {
  id: string;
  startDate: string;
  dailyMealPlans: DailyMealPlan[];
};

export type DailyMealPlan = {
  date: string;
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
};

export type Meal = {
  recipeId?: string;
  isLocked: boolean;
  isDisabled: boolean;
  mealType: MealType;
  requirements?: {
    maxTime?: number;
  };
};
