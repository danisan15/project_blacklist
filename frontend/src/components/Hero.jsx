
import Style from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={Style.flex}>

        <div className={Style.colLeft}>
            <h1 className={Style.tittle}> ¡Olvídate de los correos temporales! </h1>

            <p> Mantén limpio y seguro tu base de datos con nuestra plataforma.
                <br/> <br/>
                <b>TempBlock</b> detecta esos correos con dominio insano 
                <br/> mediante una <b>Black List.</b>
            </p>

        </div>

        <div className={Style.colRight}>

            <form action="" className={Style.formContent}>

            <h1 className="tittle"> ¡Empecemos! </h1>
            <p> Coloca aquí la dirección de correo electrónico: </p>
            <input type="text" placeholder="Dirección de Correo" className={Style.btnEmail} />
            <input type="submit" value="Buscar" className={Style.btnSubmit} />

            </form>

        </div>

    </section>
  );
}
