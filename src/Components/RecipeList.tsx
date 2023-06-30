import {
  Checkbox,
  IColumn,
  SelectionMode,
  ShimmeredDetailsList,
  Slider,
  Stack,
  Text,
} from "@fluentui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Recipe } from "../Data/Types";
import { useEffect, useState } from "react";

const Recipes = () => {
  const recipes = useSelector((state) => state.recipes);

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [menuFilters, setMenuFilters] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<number>(0);

  useEffect(() => {
    var recipesToFilter = recipes.isLoading ? [] : recipes.data;

    setFilteredRecipes(
      recipesToFilter.filter(
        (recipe) =>
          (menuFilters.some((menuFilter) => recipe.meal.includes(menuFilter)) ||
            menuFilters.length === 0) &&
          (recipe.time <= timeFilter || timeFilter === 0)
      )
    );
  }, [menuFilters, recipes, timeFilter]);

  const columns: IColumn[] = [
    {
      key: "name",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      onRender: (item: Recipe) => (
        <Link to={`/recipes/${item.id}`} title={item.name}>
          {item.name}
        </Link>
      ),
    },
    {
      key: "Meal",
      name: "Meal",
      fieldName: "meal",
      minWidth: 50,
      onRender: (item: Recipe) => <span>{item.meal.join(", ")}</span>,
    },
    {
      key: "time",
      name: "Time",
      fieldName: "time",
      minWidth: 50,
      onRender: (item: Recipe) => <span>{item.time} mins</span>,
    },
  ];

  const onChangeMenuFilter = (
    _,
    checked: boolean | undefined,
    meal: string
  ) => {
    if (checked) {
      setMenuFilters([...menuFilters, meal]);

      return;
    } else {
      setMenuFilters(menuFilters.filter((filter) => filter !== meal));

      return;
    }
  };

  const onChangeTimeFilter = (value: number) => {
    setTimeFilter(value);
  };

  return (
    <Stack styles={{ root: { padding: 10 } }} tokens={{ childrenGap: 10 }}>
      <Text variant="xxLarge">Browse Recipes</Text>
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack tokens={{ childrenGap: 5 }}>
          <Text styles={{ root: { fontWeight: 600 } }}>Filter by meal</Text>
          <Stack
            horizontal
            horizontalAlign="space-between"
            tokens={{ childrenGap: 10 }}
          >
            <Checkbox
              label="Breakfast"
              boxSide="end"
              onChange={(_, checked) =>
                onChangeMenuFilter(_, checked, "Breakfast")
              }
            />
            <Checkbox
              label="Lunch"
              boxSide="end"
              onChange={(_, checked) => onChangeMenuFilter(_, checked, "Lunch")}
            />
            <Checkbox
              label="Dinner"
              boxSide="end"
              onChange={(_, checked) =>
                onChangeMenuFilter(_, checked, "Dinner")
              }
            />
          </Stack>
        </Stack>
        <Slider
          label="Max time"
          max={
            recipes.isLoading
              ? 0
              : Math.max(...recipes.data.map((recipe) => recipe.time))
          }
          defaultValue={
            recipes.isLoading
              ? 0
              : Math.max(...recipes.data.map((recipe) => recipe.time))
          }
          step={5}
          showValue
          styles={{ valueLabel: { width: "" } }}
          onChange={(a) => onChangeTimeFilter(a)}
        />
      </Stack>
      <ShimmeredDetailsList
        columns={columns}
        compact
        enableShimmer={recipes.isLoading}
        items={filteredRecipes}
        selectionMode={SelectionMode.none}
      />
    </Stack>
  );
};

export default Recipes;
