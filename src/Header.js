import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <li>
        <NavLink to="/schools">schools</NavLink>
      </li>
      <li>Contact</li>
    </header>
  );
};

export default Header;
