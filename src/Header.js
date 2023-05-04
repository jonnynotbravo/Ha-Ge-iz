import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header id="header">
      <nav className="links" style={{ "--items": 5 }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/schools">Schools</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/admin" style={{ color: "red" }}>
          Admin
        </NavLink>
        <span className="line"></span>
      </nav>
    </header>
  );
};

export default Header;
