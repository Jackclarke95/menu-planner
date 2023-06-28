import { logOut } from "./LoginPage";
import "./Header.scss";
import DataService from "../Helpers/DataService";

const Header = () => {
  return (
    <div className="header-container">
      <h1>Menu Planner</h1>
      <button onClick={logOut}>Sign out</button>
      <button onClick={() => console.log(DataService.generateKey())}>
        Key
      </button>
    </div>
  );
};

export default Header;
