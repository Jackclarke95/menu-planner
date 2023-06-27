import { useSelector } from "react-redux";

export default () => {
  const recipes = useSelector((state) => state.recipes);

  console.log(recipes);

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {recipes.data.map((recipe) => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
