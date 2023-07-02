import { Depths, PrimaryButton, Stack, Text } from "@fluentui/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BasePage from "./BasePage";
import MealPlanDayCard from "../MealPlanDayCard";
import {
  Document,
  PDFDownloadLink,
  StyleSheet,
  Page,
  View,
} from "@react-pdf/renderer";
import { DailyMealPlan, WeeklyMealPlan } from "../../Data/Types";
import DataHelper from "../../Helpers/DataHelper";

const MealPlanPage = () => {
  const { mealPlanId } = useParams();

  const recipes = useSelector((state) => state.recipes);
  const weeklyMealPlans = useSelector((state) => state.weeklyMealPlans);

  const weeklyMealPlan = weeklyMealPlans.isLoading
    ? undefined
    : weeklyMealPlans.data.find(
        (weeklyMeanPlan) => weeklyMeanPlan.id === mealPlanId
      );

  if (!weeklyMealPlan) {
    return <Text>Meal Plan not found</Text>;
  } else {
    const dailyMealPlans = weeklyMealPlan.dailyMealPlans
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));

    // Create Document Component
    const MyDocument: React.FC<{ weeklyMealPlan: WeeklyMealPlan }> = ({
      weeklyMealPlan,
    }) => {
      // Create styles
      const styles = StyleSheet.create({
        page: {
          padding: 10,
          flexDirection: "column",
          backgroundColor: "#E4E4E4",
        },
        section: {
          margin: 10,
          flexDirection: "column",
          alignContent: "space-between",
          width: "100%",
        },
        row: {
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        },
        dayTitle: {
          marginRight: 25,
          fontSize: 16,
          width: "17%",
        },
        mealContainer: {
          padding: 5,
          border: "1px solid black",
          flexDirection: "column",
          flexGrow: 1,
          width: "30%",
          height: "100%",
        },
        mealTitle: {
          fontSize: 14,
          paddingBottom: 5,
        },
        mealContents: {
          fontSize: 12,
        },
      });

      const Row = (dailyMealPlan: DailyMealPlan): JSX.Element => {
        const filteredRecipes = recipes.isLoading ? [] : recipes.data;

        const breakfastName = filteredRecipes?.find(
          (recipe) => recipe.id === dailyMealPlan.breakfast?.recipeId
        )?.name;

        const lunchName = filteredRecipes?.find(
          (recipe) => recipe.id === dailyMealPlan.lunch?.recipeId
        )?.name;

        const dinnerName = filteredRecipes?.find(
          (recipe) => recipe.id === dailyMealPlan.dinner?.recipeId
        )?.name;

        console.log(
          dailyMealPlan.day,
          { breakfastName },
          { lunchName },
          { dinnerName }
        );

        return (
          <View style={styles.row}>
            <Text style={styles.dayTitle}>
              {DataHelper.capitaliseFirstLetter(dailyMealPlan.day)}
            </Text>
            <View style={styles.mealContainer}>
              <Text style={styles.mealTitle}>Breakfast</Text>
              <Text style={styles.mealContents}>{breakfastName}</Text>
            </View>
            <View style={styles.mealContainer}>
              <Text style={styles.mealTitle}>Lunch</Text>
              <Text style={styles.mealContents}>{lunchName}</Text>
            </View>
            <View style={styles.mealContainer}>
              <Text style={styles.mealTitle}>Dinner</Text>
              <Text style={styles.mealContents}>{dinnerName}</Text>
            </View>
          </View>
        );
      };

      return (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text>{`Meal Planner - ${new Date(
              weeklyMealPlan.startDate
            ).toDateString()}`}</Text>
            {dailyMealPlans.map((dailyMealPlan) => {
              return (
                <View key={dailyMealPlan.date} style={styles.section}>
                  {Row(dailyMealPlan)}
                </View>
              );
            })}
          </Page>
        </Document>
      );
    };

    return (
      <BasePage pageTitle={new Date(weeklyMealPlan.startDate).toDateString()}>
        <Stack styles={{ root: { padding: 10 } }} tokens={{ childrenGap: 10 }}>
          <PDFDownloadLink
            document={<MyDocument weeklyMealPlan={weeklyMealPlan} />}
            fileName="MealPlanner.pdf"
            className="pdf-download-link"
          />
          <PrimaryButton
            text="Save as PDF"
            onClick={() => {
              let pdfDownloadLink = document.getElementsByClassName(
                "pdf-download-link"
              )[0] as HTMLElement;
              pdfDownloadLink.click();
            }}
          />
          {dailyMealPlans.map((dailyMealPlan) => {
            return (
              <Stack
                key={dailyMealPlan.date}
                styles={{ root: { boxShadow: Depths.depth8, padding: 10 } }}
              >
                <MealPlanDayCard
                  dailyMealPlan={dailyMealPlan}
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
