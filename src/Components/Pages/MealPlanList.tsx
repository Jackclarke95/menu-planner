import { useSelector } from "react-redux";
import BasePage from "./BasePage";
import { Depths, Stack, Text } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

const MealPlanList = () => {
  const navigate = useNavigate();

  const mealPlans = useSelector((state) => state.mealPlans);

  return (
    <BasePage pageTitle="Meal Plans">
      {mealPlans.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Stack tokens={{ childrenGap: 10, padding: 10 }}>
          {mealPlans.data.map((mealPlan) => {
            return (
              <Stack
                key={mealPlan.id}
                styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}
              >
                <Text onClick={() => navigate(`/meal-plans/${mealPlan.id}`)}>
                  {new Date(mealPlan.date).toDateString()}
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
