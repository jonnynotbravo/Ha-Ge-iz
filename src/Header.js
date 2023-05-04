import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header id="header">
      <nav className="links" style={{ "--items": 5 }}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Schools</a>
        <a href="#">Contact</a>
        <a href="#">Admin</a>
        <span className="line"></span>
      </nav>
    </header>
  );
};

export default Header;
