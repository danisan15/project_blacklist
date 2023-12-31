import PlanCard from "./PlanCard";
import Hero from "./Hero";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Support from "./Support";
import NoHero from "./NoHero";

import imagenGratuito from "../assets/gratis.png";
import imagenPremium from "../assets/premium.png";
import imagenTop from "../assets/top.png";

import "../App.css";
import { useEffect, useState } from "react";
import getTokenAndUser from "../hooks/useLocalStorage";

const LandingPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isFree, setIsFree] = useState(false);

  useEffect(() => {
    console.log(localStorage.length);
    if (localStorage.length > 0) {
      try {
        const userObject = getTokenAndUser();
        userObject?.token ? setIsLogged(true) : setIsLogged(false);
        let fk_plan = localStorage.getItem("fk_plan");
        if (fk_plan == "1") setIsFree(true);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <>
      <NavBar isLogged={isLogged} isFree={isFree} />
      <main>
        {isLogged ? <Hero /> : <NoHero />}

        <header className="title">Elige el plan más adecuado para ti</header>

        <section className="plan-section" id="pricing">
          {!isLogged ? (
            <PlanCard
              img={imagenGratuito}
              title="Básico"
              price="Free"
              descrip="Este plan es ideal si estás empezando y no necesitas muchas solicitudes. Con este plan, tendrás acceso a 20 solicitudes al mes de forma gratuita."
              buttonText="Empieza gratis"
              isLogged={isLogged}
            />
          ) : null}

          <PlanCard
            img={imagenPremium}
            featured
            planPaid="plan premium"
            title="Premium"
            price="$10 por mes"
            descrip="Si necesitas más solicitudes, nuestro plan premium es perfecto para ti. Con este plan, tendrás acceso a 1.000 solicitudes al mes por solo $10 dólares."
            support
            buttonText="Adquirir plan"
            isLogged={isLogged}
          />

          <PlanCard
            img={imagenTop}
            title="Plan Top"
            planPaid="plan top"
            price="30$ por mes"
            descrip="Si necesitas aún más solicitudes, nuestro plan top es la mejor opción. Con este plan, tendrás acceso a 10.000 solicitudes al mes por solo $30 dólares."
            support
            buttonText="Adquirir plan"
            isLogged={isLogged}
          />
        </section>
        {isLogged && !isFree ? (
          <section className="support-section" id="support">
            <Support />
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
