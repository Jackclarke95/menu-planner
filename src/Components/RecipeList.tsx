import {
  IColumn,
  IImageStyles,
  Image,
  ImageFit,
  SelectionMode,
  Separator,
  ShimmeredDetailsList,
  Slider,
  Stack,
  Text,
} from "@fluentui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../Data/Types";
import { useEffect, useState } from "react";
import BreakfastIcon from "../Images/breakfast.png";
import LunchIcon from "../Images/sandwich.png";
import DinnerIcon from "../Images/restaurant.png";
import BasePage from "./BasePage";

const Recipes = () => {
  const navigate = useNavigate();

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
        <span onClick={() => navigate(`/recipes/${item.id}`)} title={item.name}>
          {item.name}
        </span>
      ),
    },
    {
      key: "Meal",
      name: "Meal",
      fieldName: "meal",
      minWidth: 50,
      onRender: (item: Recipe) => (
        <span onClick={() => navigate(`/recipes/${item.id}`)}>
          {item.meal.join(", ")}
        </span>
      ),
    },
    {
      key: "time",
      name: "Time",
      fieldName: "time",
      minWidth: 50,
      onRender: (item: Recipe) => (
        <span onClick={() => navigate(`/recipes/${item.id}`)}>
          {item.time} mins
        </span>
      ),
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

  const MealFilterIcon: React.FC<{ label: string; icon: string }> = ({
    label,
    icon,
  }) => {
    const disabledIconStyles: IImageStyles = {
      root: {
        opacity: 0.2,
      },
      image: icon,
    };

    return (
      <Image
        src={icon}
        alt="Breakfast Icon"
        height={60}
        width={50}
        imageFit={ImageFit.contain}
        styles={menuFilters.includes(label) ? undefined : disabledIconStyles}
        onClick={() => onChangeMenuFilter(label)}
        shouldStartVisible={true}
      />
    );
  };

  return (
    <BasePage pageTitle="Recipes">
      <Stack tokens={{ childrenGap: 5 }}>
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
        <Text styles={{ root: { fontWeight: 600 } }}>Filter by meal</Text>
      </Stack>
      <Separator />
      <Slider
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
      <Text styles={{ root: { fontWeight: 600 } }}>Filter by time</Text>
      <ShimmeredDetailsList
        columns={columns}
        compact
        enableShimmer={recipes.isLoading}
        items={filteredRecipes}
        selectionMode={SelectionMode.none}
      />
    </BasePage>
  );
};

export default Recipes;
