import Logo from "../assets/logo_uno.png";
import Facebook from "../assets/icon_facebook.png";
import Instagram from "../assets/icon_instagram.png";
import Twitter from "../assets/icon_twitter.png";


import Style from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={Style.flex}>
        <img className={Style.logo} src={Logo} />
        <p> Todos los derechos Reservados </p>

        <div className={Style.social} >
        <img className={Style.instagram} src={Instagram} />
        <img className={Style.facebook} src={Facebook} />
        <img className={Style.twitter} src={Twitter} />
        </div>

    </div>
  );
}
