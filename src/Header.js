import { NavLink } from "react-router-dom";

const Header = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <header id="header">
      <nav className="links" style={{ "--items": 5 }}>
        <NavLink to="/" id="home" onClick={handleClick}>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/schools">Schools</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/student" style={{ color: "#0765FF" }}>
          Student/Parent Login
        </NavLink>
        <NavLink to="/admin" style={{ color: "red" }}>
          Admin
        </NavLink>
        <span className="line"></span>
      </nav>
    </header>
  );
};

export default Header;
