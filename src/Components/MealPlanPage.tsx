import { Stack, Text } from "@fluentui/react";
import BasePage from "./BasePage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MealPlanPage = () => {
  const { mealPlanId } = useParams();

  console.log({ mealPlanId });

  const mealPlans = useSelector((state) => state.mealPlans);

  console.log({ mealPlans });

  const mealPlan = mealPlans.isLoading
    ? undefined
    : mealPlans.data.find((mealPlan) => mealPlan.id === mealPlanId);

  console.log({ mealPlan });

  if (!mealPlan) {
    return <Text>Meal Plan not found</Text>;
  } else {
    const days = Object.keys(mealPlan.recipes).map((key) => key.toUpperCase());

    return (
      <BasePage pageTitle={"Meal Plan"}>
        <Text variant="large">{new Date(mealPlan.date).toDateString()}</Text>
        <Stack>
          {days.map((day) => (
            <Text>{day}</Text>
          ))}
        </Stack>
      </BasePage>
    );
  }
};

export default MealPlanPage;
