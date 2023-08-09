import Logo from "../assets/logo_uno.png";
import Style from "./Navbar.module.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  const handleScrollToPlans = () => {
    const plansSection = document.getElementById("pricing");
    plansSection.scrollIntoView({ behavior: "smooth" });
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
          <a className={Style.link} onClick={handleScrollToPlans}>
            {" "}
            Planes{" "}
          </a>
        </li>

        <li>
          <a className={Style.link} href="#contact">
            Contacto{" "}
          </a>
        </li>

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
      </ul>
    </nav>
  );
}
