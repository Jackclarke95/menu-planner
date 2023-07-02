import { Stack, Text, Depths, Icon } from "@fluentui/react";
import { ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseDb } from "../../App";
import { MealType } from "../../Data/Enums";
import DataHelper from "../../Helpers/DataHelper";
import { DailyMealPlan } from "../../Data/Types";
import { useSelector } from "react-redux";

const MealLine: React.FC<{
  mealType: MealType;
  dailyMealPlan: DailyMealPlan;
  weeklyMealPlanId: string;
}> = ({ mealType, dailyMealPlan, weeklyMealPlanId }) => {
  const recipes = useSelector((state) => state.recipes);

  const meal = dailyMealPlan[mealType];

  const [isLocked, setIsLocked] = useState<boolean>(meal?.isLocked ?? false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsLocked(meal?.isLocked ?? false);
    setIsDisabled(meal?.isDisabled ?? false);
  }, [meal]);

  const mealRef = ref(
    firebaseDb,
    `/weeklyMealPlans/${weeklyMealPlanId}/dailyMealPlans/${dailyMealPlan.day}/${mealType}`
  );

  const onClickLockMeal = (e: React.MouseEvent<HTMLElement | MouseEvent>) => {
    e.stopPropagation();

    if (isDisabled) {
      return;
    }

    const newValue = !isLocked;

    update(mealRef, {
      isLocked: newValue,
    });

    setIsLocked(newValue);
  };

  const onClickDisableMeal = (
    e: React.MouseEvent<HTMLElement | MouseEvent>
  ) => {
    e.stopPropagation();

    const newValue = !isDisabled;

    update(mealRef, {
      isDisabled: newValue,
    });

    setIsDisabled(newValue);
  };

  const recipe = recipes.isLoading
    ? undefined
    : recipes.data.find((recipe) => recipe.id === meal?.recipeId);

  const onClickRefreshMeal = (
    e: React.MouseEvent<HTMLElement | MouseEvent>
  ) => {
    e.stopPropagation();

    if (!meal) {
      throw new Error(`Meal not found for meal type ${mealType}`);
    }

    if (meal.isLocked || meal.isDisabled) {
      return;
    }

    const newRecipe = DataHelper.getApplicableRecipe(
      meal,
      mealType,
      recipes.isLoading ? [] : recipes.data
    );

    update(mealRef, {
      recipeId: newRecipe.id,
    });
  };

  console.log(dailyMealPlan);

  return (
    <Stack styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}>
      <Stack horizontal horizontalAlign="space-between">
        <Text styles={{ root: { opacity: isDisabled ? 0.3 : 1 } }}>
          {DataHelper.capitaliseFirstLetter(mealType)}
        </Text>
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <Icon
            iconName="StatusCircleBlock"
            onClick={onClickDisableMeal}
            styles={{ root: { opacity: isDisabled ? 0.3 : 1 } }}
          />
          <Icon
            iconName="SyncOccurence"
            onClick={onClickRefreshMeal}
            styles={{ root: { opacity: isDisabled || isLocked ? 0.3 : 1 } }}
          />
          <Icon
            iconName={isLocked ? "Lock" : "Unlock"}
            onClick={onClickLockMeal}
            styles={{ root: { opacity: isDisabled ? 0.3 : 1 } }}
          />
        </Stack>
      </Stack>
      <Text styles={{ root: { opacity: isDisabled ? 0.3 : 1 } }}>
        {recipe?.name ?? "Unselected"}
      </Text>
    </Stack>
  );
};

export default MealLine;
