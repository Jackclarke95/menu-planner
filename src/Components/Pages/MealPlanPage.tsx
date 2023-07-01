import { Depths, Stack, Text } from "@fluentui/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BasePage from "./BasePage";
import MealPlanDayCard from "../MealPlanDayCard";

const MealPlanPage = () => {
  const { mealPlanId } = useParams();

  const mealPlans = useSelector((state) => state.mealPlans);

  const mealPlan = mealPlans.isLoading
    ? undefined
    : mealPlans.data.find((mealPlan) => mealPlan.id === mealPlanId);

  if (!mealPlan) {
    return <Text>Meal Plan not found</Text>;
  } else {
    return (
      <BasePage pageTitle={new Date(mealPlan.date).toDateString()}>
        <Stack styles={{ root: { padding: 10 } }} tokens={{ childrenGap: 10 }}>
          {mealPlan.recipes.map((recipe, index) => (
            <Stack
              key={index}
              styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}
            >
              <MealPlanDayCard mealPlanDay={recipe}></MealPlanDayCard>
            </Stack>
          ))}
        </Stack>
      </BasePage>
    );
  }
};

export default MealPlanPage;
