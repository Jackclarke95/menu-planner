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
  date: string;
  monday: DailyMealPlan;
  tuesday: DailyMealPlan;
  wednesday: DailyMealPlan;
  thursday: DailyMealPlan;
  friday: DailyMealPlan;
  saturday: DailyMealPlan;
  sunday: DailyMealPlan;
};

export type DailyMealPlan = {
  date: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
};

export type Meal = {
  recipeId: string;
  isLocked: boolean;
  mealType: MealType;
  requirements?: {
    maxTime?: number;
  };
};
