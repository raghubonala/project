import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="navbar">
      <div className="brand">
        <h1>Raghu</h1>
      </div>
      <div className={`drawer ${drawerOpen ? "open" : ""}`} id="appDrawer">
        <ul className="list">
        <li>
          <Link onClick={toggleDrawer} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link onClick={toggleDrawer} to="/about">
          About
          </Link>
        </li>
        <li>
          <Link onClick={toggleDrawer} to="/contact">
        Contact
          </Link>
        </li>
        </ul>
      </div>
      <ul className="mobile-support">
        <div onClick={toggleDrawer}>
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
