import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { PrimaryButton, Stack } from "@fluentui/react";
import "./PdfTestPage.scss";
import { useSelector } from "react-redux";
import { Recipe } from "../../Data/Types";
import DataHelper from "../../Helpers/DataHelper";
import BasePage from "./BasePage";

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

// Create Document Component
const MyDocument: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => {
  let breakfasts = recipes.filter((recipe) =>
    recipe.meal.includes("Breakfast")
  );
  let lunches = recipes.filter((recipe) => recipe.meal.includes("Lunch"));
  let dinners = recipes.filter((recipe) => recipe.meal.includes("Dinner"));

  const Row = (day: string) => (
    <View style={styles.row}>
      <Text style={styles.dayTitle}>{day}</Text>
      <View style={styles.mealContainer}>
        <Text style={styles.mealTitle}>Breakfast</Text>
        <Text style={styles.mealContents}>
          {DataHelper.getRandomFromArray(breakfasts)?.name}
        </Text>
      </View>
      <View style={styles.mealContainer}>
        <Text style={styles.mealTitle}>Lunch</Text>
        <Text style={styles.mealContents}>
          {DataHelper.getRandomFromArray(lunches)?.name}
        </Text>
      </View>
      <View style={styles.mealContainer}>
        <Text style={styles.mealTitle}>Dinner</Text>
        <Text style={styles.mealContents}>
          {DataHelper.getRandomFromArray(dinners)?.name}
        </Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>{`Meal Planner - ${new Date().toDateString()}`}</Text>
        <View style={styles.section}>{Row("Monday")}</View>
        <View style={styles.section}>{Row("Tuesday")}</View>
        <View style={styles.section}>{Row("Wednesday")}</View>
        <View style={styles.section}>{Row("Thursday")}</View>
        <View style={styles.section}>{Row("Friday")}</View>
        <View style={styles.section}>{Row("Saturday")}</View>
        <View style={styles.section}>{Row("Sunday")}</View>
      </Page>
    </Document>
  );
};

const PdfTestPage = () => {
  let recipes = useSelector((state) => state.recipes);

  return (
    <BasePage pageTitle="PDF Test">
      <Stack tokens={{ childrenGap: 10 }}>
        <PDFViewer>
          <MyDocument recipes={recipes.isLoading ? [] : recipes.data} />
        </PDFViewer>
        <PDFDownloadLink
          document={
            <MyDocument recipes={recipes.isLoading ? [] : recipes.data} />
          }
          fileName="MealPlanner.pdf"
          className="pdf-download-link"
        />
        <PrimaryButton
          text="Save PDF"
          onClick={() => {
            let pdfDownloadLink = document.getElementsByClassName(
              "pdf-download-link"
            )[0] as HTMLElement;
            pdfDownloadLink.click();
          }}
        />
      </Stack>
    </BasePage>
  );
};

export default PdfTestPage;
