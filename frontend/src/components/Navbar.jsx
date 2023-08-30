import Logo from "../assets/logo_uno.png";
import Style from "./Navbar.module.css";

import { Link } from "react-router-dom";

export default function Navbar({ isLogged }) {
  const handleScroll = ({ id }) => {
    const splitId = id.split("-");
    const scrollElement = document.getElementById(splitId[0]);
    scrollElement.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <nav className={Style.navbar} id="nav">
      <ul className={Style.navGroup}>
        <li>
          <a className={Style.link} href="#welcome">
            Inicio
          </a>
        </li>

        <li>
          <a
            className={Style.link}
            onClick={({ target }) => handleScroll(target)}
            id="pricing-link"
          >
            {" "}
            Planes{" "}
          </a>
        </li>

        {isLogged ? (
          <li>
            <a
              className={Style.link}
              onClick={({ target }) => handleScroll(target)}
              id="support-link"
            >
              Soporte
            </a>
          </li>
        ) : null}

        <li>
          <img className={Style.logo} src={Logo} />
        </li>

        <li>
          <Link className={Style.btn} to="/login">
            {" "}
            Iniciar Sesión{" "}
          </Link>
        </li>

        <li>
          <Link className={Style.btn} to="/signup">
            {" "}
            Registrarse{" "}
          </Link>
        </li>
        {isLogged ? (
          <li>
            <Link className={Style.btn} onClick={handleClick}>
              {" "}
              Log out{" "}
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
