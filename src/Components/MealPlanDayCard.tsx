import { Icon, Stack, Text } from "@fluentui/react";
import { DailyMealPlan } from "../Data/Types";
import DataHelper from "../Helpers/DataHelper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MealType } from "../Data/Enums";
import { ref, update } from "firebase/database";
import { firebaseDb } from "../App";
import MealLine from "./MealLine";

const MealPlanDayCard: React.FC<{
  dailyMealPlan: DailyMealPlan;
  mealPlanId: string;
}> = ({ dailyMealPlan, mealPlanId: weeklyMealPlanId }) => {
  const recipes = useSelector((state) => state.recipes);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [mealsLocked, setMealsLocked] = useState<boolean>(
    dailyMealPlan.breakfast.isLocked &&
      dailyMealPlan.lunch.isLocked &&
      dailyMealPlan.dinner.isLocked
  );
  const [mealsDisabled, setMealsDisabled] = useState<boolean>(
    dailyMealPlan.breakfast.isDisabled &&
      dailyMealPlan.lunch.isDisabled &&
      dailyMealPlan.dinner.isDisabled
  );

  useEffect(() => {
    setMealsLocked(
      dailyMealPlan.breakfast.isLocked &&
        dailyMealPlan.lunch.isLocked &&
        dailyMealPlan.dinner.isLocked
    );

    setMealsDisabled(
      dailyMealPlan.breakfast.isDisabled &&
        dailyMealPlan.lunch.isDisabled &&
        dailyMealPlan.dinner.isDisabled
    );
  }, [dailyMealPlan]);

  if (recipes.isLoading) {
    return <Text>Loading...</Text>;
  }

  const onChangeIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const onClickDisableDay = (e: React.MouseEvent<HTMLElement | MouseEvent>) => {
    e.stopPropagation();
    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      const meal = dailyMealPlan[mealType];

      if (!meal) {
        throw new Error(`Meal not found for meal type ${mealType}`);
      }
      const mealRef = ref(
        firebaseDb,
        `/weeklyMealPlans/${weeklyMealPlanId}/dailyMealPlans/${dailyMealPlan.day}/${mealType}`
      );

      if (mealsDisabled) {
        update(mealRef, {
          isDisabled: false,
        });
      } else {
        update(mealRef, {
          isDisabled: true,
          recipeId: null,
        });
      }
    });
  };

  const onClickLockDay = (e: React.MouseEvent<HTMLElement | MouseEvent>) => {
    e.stopPropagation();
    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      const meal = dailyMealPlan[mealType];

      if (!meal) {
        throw new Error(`Meal not found for meal type ${mealType}`);
      }

      if (meal.isDisabled) {
        return;
      }

      const mealRef = ref(
        firebaseDb,
        `/weeklyMealPlans/${weeklyMealPlanId}/dailyMealPlans/${dailyMealPlan.day}/${mealType}`
      );

      if (mealsLocked) {
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

    if (mealsLocked) {
      return;
    }

    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      const meal = dailyMealPlan[mealType];

      if (!meal) {
        throw new Error(`Meal not found for meal type ${mealType}`);
      }

      if (meal.isLocked || meal.isDisabled) {
        return;
      }

      const newRecipe = DataHelper.getApplicableRecipe(
        meal,
        mealType.toString() as MealType,
        recipes.data
      );

      const mealRef = ref(
        firebaseDb,
        `/weeklyMealPlans/${weeklyMealPlanId}/dailyMealPlans/${dailyMealPlan.day}/${mealType}`
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
          <Icon iconName="Blocked" onClick={onClickDisableDay} />
          <Icon
            iconName="SyncOccurence"
            onClick={onClickRefreshDay}
            styles={mealsDisabled ? { root: { opacity: 0.3 } } : undefined}
          />
          <Icon
            iconName={mealsLocked ? "Lock" : "Unlock"}
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
          <MealLine
            mealType={MealType.Breakfast}
            dailyMealPlan={dailyMealPlan}
            weeklyMealPlanId={weeklyMealPlanId}
          />
          <MealLine
            mealType={MealType.Lunch}
            dailyMealPlan={dailyMealPlan}
            weeklyMealPlanId={weeklyMealPlanId}
          />
          <MealLine
            mealType={MealType.Dinner}
            dailyMealPlan={dailyMealPlan}
            weeklyMealPlanId={weeklyMealPlanId}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default MealPlanDayCard;
