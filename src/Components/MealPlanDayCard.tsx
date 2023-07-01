import { Depths, Icon, Stack, Text } from "@fluentui/react";
import { MealPlanDay, Recipe } from "../Data/Types";
import DataHelper from "../Helpers/DataHelper";
import { useState } from "react";
import { useSelector } from "react-redux";

const MealPlanDayCard: React.FC<{ mealPlanDay: MealPlanDay }> = ({
  mealPlanDay,
}) => {
  const recipes = useSelector((state) => state.recipes);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (recipes.isLoading) {
    return <Text>Loading...</Text>;
  }

  const breakfast = recipes.data.find(
    (recipe) => recipe.id === mealPlanDay.breakfast.recipeId
  );
  const lunch = recipes.data.find(
    (recipe) => recipe.id === mealPlanDay.lunch.recipeId
  );
  const dinner = recipes.data.find(
    (recipe) => recipe.id === mealPlanDay.dinner.recipeId
  );

  const onChangeIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  var MealLine: React.FC<{ recipe: Recipe | undefined; label: string }> = ({
    recipe,
    label,
  }) => {
    return (
      <Stack styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text>{label}</Text>
          <Icon iconName={mealPlanDay.lunch.isLocked ? "Lock" : "Unlock"} />
        </Stack>
        <Text>{recipe?.name ?? "Undefined"}</Text>
      </Stack>
    );
  };

  return (
    <Stack>
      <Stack
        horizontal
        horizontalAlign="space-between"
        onClick={onChangeIsExpanded}
      >
        <Text>{DataHelper.getWeekdayName(mealPlanDay.date)}</Text>
        <Icon iconName={isExpanded ? "ChevronUpMed" : "ChevronDownMed"} />
      </Stack>
      {isExpanded && (
        <Stack
          tokens={{ childrenGap: 5 }}
          styles={{ root: { paddingTop: 10 } }}
        >
          <MealLine recipe={breakfast} label="Breakfast" />
          <MealLine recipe={lunch} label="Lunch" />
          <MealLine recipe={dinner} label="Dinner" />
        </Stack>
      )}
    </Stack>
  );
};

export default MealPlanDayCard;
