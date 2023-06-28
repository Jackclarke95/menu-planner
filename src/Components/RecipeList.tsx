import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const navigate = useNavigate();
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
            <li key={recipe.id} onClick={() => navigate(`${recipe.id}`)}>
              {recipe.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recipes;
