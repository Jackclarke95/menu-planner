import { logOut } from "./LoginPage";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <h1>Menu Planner</h1>
      <button onClick={logOut}>Sign out </button>
    </div>
  );
};

export default Header;
