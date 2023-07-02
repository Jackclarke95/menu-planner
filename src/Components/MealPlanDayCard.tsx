import { Depths, Icon, Stack, Text } from "@fluentui/react";
import { Meal, DailyMealPlan } from "../Data/Types";
import DataHelper from "../Helpers/DataHelper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MealType } from "../Data/Enums";
import { ref, update } from "firebase/database";
import { db } from "../App";

const MealPlanDayCard: React.FC<{
  dailyMealPlan: DailyMealPlan;
  mealPlanId: string;
}> = ({ dailyMealPlan, mealPlanId }) => {
  const recipes = useSelector((state) => state.recipes);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(
    dailyMealPlan.breakfast.isLocked &&
      dailyMealPlan.lunch.isLocked &&
      dailyMealPlan.dinner.isLocked
  );

  useEffect(() => {
    setIsLocked(
      dailyMealPlan.breakfast.isLocked &&
        dailyMealPlan.lunch.isLocked &&
        dailyMealPlan.dinner.isLocked
    );
  }, [dailyMealPlan]);

  if (recipes.isLoading) {
    return <Text>Loading...</Text>;
  }

  const onChangeIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const MealLine: React.FC<{
    mealType: MealType;
  }> = ({ mealType }) => {
    const meal = dailyMealPlan[mealType];

    const [isLocked, setIsLocked] = useState<boolean>(meal?.isLocked ?? false);

    const mealRef = ref(
      db,
      `/weeklyMealPlans/${mealPlanId}/dailyMealPlans/${dailyMealPlan.day}/${mealType}`
    );

    const onClickLockMeal = (e: React.MouseEvent<HTMLElement | MouseEvent>) => {
      e.stopPropagation();

      const newValue = !isLocked;

      update(mealRef, {
        isLocked: newValue,
      });

      setIsLocked(newValue);
    };

    const recipe = recipes.data.find((recipe) => recipe.id === meal?.recipeId);

    const onClickRefreshMeal = (
      e: React.MouseEvent<HTMLElement | MouseEvent>
    ) => {
      e.stopPropagation();
      if (meal?.isLocked) {
        return;
      }

      if (!meal) {
        throw new Error(`Meal not found for meal type ${mealType}`);
      }

      const newRecipe = getApplicableRecipe(meal, mealType);

      update(mealRef, {
        recipeId: newRecipe.id,
      });
    };

    return (
      <Stack styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text>{DataHelper.capitaliseFirstLetter(mealType)}</Text>
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <Icon
              iconName="SyncOccurence"
              onClick={onClickRefreshMeal}
              styles={isLocked ? { root: { opacity: 0.3 } } : undefined}
            />
            <Icon
              iconName={isLocked ? "Lock" : "Unlock"}
              onClick={onClickLockMeal}
            />
          </Stack>
        </Stack>
        <Text>{recipe?.name ?? "Unselected"}</Text>
      </Stack>
    );
  };

  const getApplicableRecipe = (meal: Meal, mealType: MealType) => {
    const applicableRecipes = recipes.data.filter(
      (recipe) =>
        recipe.mealType.includes(mealType) &&
        (!meal.requirements?.maxTime ||
          recipe.time <= meal.requirements?.maxTime)
    );

    const newRecipe = DataHelper.getRandomFromArray(applicableRecipes);

    return newRecipe;
  };

  const onClickLockDay = (e: React.MouseEvent<HTMLElement | MouseEvent>) => {
    e.stopPropagation();
    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      const meal = dailyMealPlan[mealType];

      if (!meal) {
        throw new Error(`Meal not found for meal type ${mealType}`);
      }

      const mealRef = ref(
        db,
        `/weeklyMealPlans/${mealPlanId}/dailyMealPlans/${dailyMealPlan.day}/${mealType}`
      );

      if (isLocked) {
        update(mealRef, {
          isLocked: false,
        });
      } else {
        update(mealRef, {
          isLocked: true,
        });
      }
    });
  };

  const onClickRefreshDay = (e: React.MouseEvent<HTMLElement | MouseEvent>) => {
    e.stopPropagation();

    if (isLocked) {
      return;
    }

    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      const meal = dailyMealPlan[mealType];

      console.log(meal);

      if (!meal) {
        throw new Error(`Meal not found for meal type ${mealType}`);
      }

      if (meal.isLocked) {
        return;
      }

      const newRecipe = getApplicableRecipe(
        meal,
        mealType.toString() as MealType
      );

      const mealRef = ref(
        db,
        `/weeklyMealPlans/${mealPlanId}/dailyMealPlans/${dailyMealPlan.day}/${mealType}`
      );

      update(mealRef, {
        recipeId: newRecipe.id,
      });
    });
  };

  return (
    <Stack>
      <Stack
        horizontal
        horizontalAlign="space-between"
        onClick={onChangeIsExpanded}
      >
        <Text>{DataHelper.getWeekdayName(dailyMealPlan.date)}</Text>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Icon
            iconName="SyncOccurence"
            onClick={onClickRefreshDay}
            styles={isLocked ? { root: { opacity: 0.3 } } : undefined}
          />
          <Icon
            iconName={isLocked ? "Lock" : "Unlock"}
            onClick={onClickLockDay}
          />
          <Icon iconName={isExpanded ? "ChevronUpMed" : "ChevronDownMed"} />
        </Stack>
      </Stack>
      {isExpanded && (
        <Stack
          tokens={{ childrenGap: 5 }}
          styles={{ root: { paddingTop: 10 } }}
        >
          <MealLine mealType={MealType.Breakfast} />
          <MealLine mealType={MealType.Lunch} />
          <MealLine mealType={MealType.Dinner} />
        </Stack>
      )}
    </Stack>
  );
};

export default MealPlanDayCard;
