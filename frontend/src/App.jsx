import PlanCard from './components/PlanCard'
import Hero from './components/Hero'
import NavBar from './components/Navbar'
import Footer from './components/Footer'

import imagenGratuito from './assets/gratis.png';
import imagenPremium from './assets/premium.png';
import imagenTop from './assets/top.png'
import './App.css'

function App() {

  return (
    <>
      <NavBar/>
      <main>
        <Hero/>
      <header className='title'>Elige el plan más adecuado para ti</header>
      <section className="plan-section">
        <PlanCard
          img={imagenGratuito}
          title='Básico'
          price='Free'
          descrip='Este plan es ideal si estás empezando y no necesitas muchas solicitudes. Con este plan, tendrás acceso a 20 solicitudes al mes de forma gratuita.'
          buttonText='Empieza gratis'
        />

        <PlanCard
          img={imagenPremium}
          featured
          title='Premium'
          price='$10 por mes'
          descrip="Si necesitas más solicitudes, nuestro plan premium es perfecto para ti. Con este plan, tendrás acceso a 1.000 solicitudes al mes por solo $10 dólares."
          support
          buttonText='Adquirir plan'
        />

        <PlanCard
          img={imagenTop}
          title='Plan Top'
          price='30$ por mes'
          descrip='Si necesitas aún más solicitudes, nuestro plan top es la mejor opción. Con este plan, tendrás acceso a 10.000 solicitudes al mes por solo $30 dólares.'
          support
          buttonText='Adquirir plan'
        />
      </section>
      </main>
      <Footer/>
    </>
  )
}

export default App
