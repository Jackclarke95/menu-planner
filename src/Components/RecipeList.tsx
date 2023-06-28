import {
  IColumn,
  SelectionMode,
  ShimmeredDetailsList,
  Stack,
  Text,
} from "@fluentui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Recipe } from "../Data/Types";

const Recipes = () => {
  const recipes = useSelector((state) => state.recipes);

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

  return (
    <Stack styles={{ root: { padding: 10 } }}>
      <Text variant="xxLarge">Recipes</Text>
      <ShimmeredDetailsList
        columns={columns}
        compact
        enableShimmer={recipes.isLoading}
        items={recipes.isLoading ? [] : recipes.data}
        selectionMode={SelectionMode.none}
      />
    </Stack>
  );
};

export default Recipes;
