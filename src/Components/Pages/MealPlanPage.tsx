import { Depths, Stack, Text } from "@fluentui/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BasePage from "./BasePage";
import MealPlanDayCard from "../MealPlanDayCard";

const MealPlanPage = () => {
  const { mealPlanId } = useParams();

  const weeklyMealPlans = useSelector((state) => state.weeklyMealPlans);

  const weeklyMealPlan = weeklyMealPlans.isLoading
    ? undefined
    : weeklyMealPlans.data.find(
        (weeklyMeanPlan) => weeklyMeanPlan.id === mealPlanId
      );

  if (!weeklyMealPlan) {
    return <Text>Meal Plan not found</Text>;
  } else {
    console.log({ weeklyMealPlan });

    const dailyMealPlans = weeklyMealPlan.dailyMealPlans
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));

    console.log({ dailyMealPlans });

    return (
      <BasePage pageTitle={new Date(weeklyMealPlan.startDate).toDateString()}>
        <Stack styles={{ root: { padding: 10 } }} tokens={{ childrenGap: 10 }}>
          {dailyMealPlans.map((dailyMealPlan) => {
            return (
              <Stack
                key={weeklyMealPlan.id}
                styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}
              >
                <MealPlanDayCard
                  dailyMealPlan={dailyMealPlan}
                  key={dailyMealPlan.date}
                  mealPlanId={weeklyMealPlan.id}
                />
              </Stack>
            );
          })}
        </Stack>
      </BasePage>
    );
  }
};

export default MealPlanPage;
