import {
  IColumn,
  IImageStyles,
  Image,
  ImageFit,
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
import BreakfastIcon from "../Images/breakfast.png";
import LunchIcon from "../Images/sandwich.png";
import DinnerIcon from "../Images/restaurant.png";

const Recipes = () => {
  const recipes = useSelector((state) => state.recipes);

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [menuFilters, setMenuFilters] = useState<string[]>([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);
  const [timeFilter, setTimeFilter] = useState<number>(0);

  useEffect(() => {
    const recipesToFilter = recipes.isLoading ? [] : recipes.data;

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

  const onChangeMenuFilter = (meal: string) => {
    if (menuFilters.includes(meal)) {
      const newMenuFilters = menuFilters.filter((filter) => filter !== meal);
      if (newMenuFilters.length === 0) {
        setMenuFilters(["Breakfast", "Lunch", "Dinner"]);
      } else {
        setMenuFilters(menuFilters.filter((filter) => filter !== meal));
      }

      return;
    } else {
      setMenuFilters([...menuFilters, meal]);

      return;
    }
  };

  const onChangeTimeFilter = (value: number) => {
    setTimeFilter(value);
  };

  const mealIconInactive: IImageStyles = {
    root: {
      color: "red",
      filter: "invert(80%)",
    },
    image: undefined,
  };

  console.log(menuFilters);

  const MealFilterIcon: React.FC<{ label: string; icon: string }> = ({
    label,
    icon,
  }) => {
    return (
      <Image
        src={icon}
        alt="Breakfast Icon"
        height={60}
        width={50}
        imageFit={ImageFit.contain}
        styles={menuFilters.includes(label) ? undefined : mealIconInactive}
        onClick={() => onChangeMenuFilter(label)}
        shouldFadeIn={false}
      />
    );
  };

  return (
    <Stack styles={{ root: { padding: 10 } }} tokens={{ childrenGap: 10 }}>
      <Text variant="xxLarge">Browse Recipes</Text>
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack tokens={{ childrenGap: 5 }}>
          <Text styles={{ root: { fontWeight: 600 } }}>Filter by meal</Text>
          <Stack
            horizontal
            horizontalAlign="space-around"
            tokens={{ childrenGap: 10 }}
            verticalAlign="center"
          >
            <MealFilterIcon icon={BreakfastIcon} label="Breakfast" />
            <MealFilterIcon icon={LunchIcon} label="Lunch" />
            <MealFilterIcon icon={DinnerIcon} label="Dinner" />
          </Stack>
        </Stack>
        <Slider
          label="Max time"
          max={
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
