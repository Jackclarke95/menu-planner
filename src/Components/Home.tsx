import { Link } from "react-router-dom";
import "./Home.scss";

export default () => {
  return (
    <div>
      <h2>Home</h2>
      <div className="link-container">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/account">Account</Link>
      </div>
    </div>
  );
};
