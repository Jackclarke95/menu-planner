import { logOut } from "./LoginPage";
import "./Header.scss";

export default () => {
  return (
    <div className="header-container">
      <h1>Menu Planner</h1>
      <button onClick={logOut}>Sign out </button>
    </div>
  );
};
