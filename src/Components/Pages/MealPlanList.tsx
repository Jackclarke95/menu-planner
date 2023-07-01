import { useSelector } from "react-redux";
import BasePage from "./BasePage";
import { Depths, Stack, Text } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

const MealPlanList = () => {
  const navigate = useNavigate();

  const weeklyMealPlans = useSelector((state) => state.weeklyMealPlans);

  return (
    <BasePage pageTitle="Meal Plans">
      {weeklyMealPlans.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Stack tokens={{ childrenGap: 10, padding: 10 }}>
          {weeklyMealPlans.data.map((weeklyMealPlan) => {
            return (
              <Stack
                key={weeklyMealPlan.id}
                styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}
              >
                <Text onClick={() => navigate(`/meal-plans/${weeklyMealPlan.id}`)}>
                  {new Date(weeklyMealPlan.date).toDateString()}
                </Text>
              </Stack>
            );
          })}
        </Stack>
      )}
    </BasePage>
  );
};

export default MealPlanList;
