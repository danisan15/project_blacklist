import Logo from "../assets/logo_uno.png";
import Style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={Style.navbar} id="nav">
      <ul className={Style.navGroup}>

        <li>
          <a className={Style.link} href="#welcome">Inicio</a>
        </li>

        <li>
          <a className={Style.link} href="#pricing"> Planes </a>
        </li>

        <li>
          <a className={Style.link} href="#contact">Contacto </a>
        </li>

        <li>
        <img className={Style.logo} src={Logo} />
        </li>

        <li>
          <a className={Style.btn} href=""> Iniciar Sesión </a>
        </li>

        <li>
          <a className={Style.btn} href=""> Registrarse </a>
        </li>
        
      </ul>
    </nav>
  );
}
