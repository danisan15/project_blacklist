import { useEffect, useState } from "react";
import Style from "./Hero.module.css";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(0);

  useEffect(() => {
    console.log(isValid);
  }, [isValid]);

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0) return alert("Inserte el email");
    const URL = "http://127.0.0.1:5000/verify_email";
    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };
    fetch(URL, request)
      .then((response) => response.json())
      .then((data) => {
        data.message ? setIsValid(true) : setIsValid(false);
      });
  };

  return (
    <section className={Style.flex}>
      <div className={Style.colLeft}>
        <h1 className={Style.tittle}> ¡Olvídate de los correos temporales! </h1>

        <p>
          {" "}
          Mantén limpio y seguro tu base de datos con nuestra plataforma.
          <br /> <br />
          <b>TempBlock</b> detecta esos correos con dominio insano
          <br /> mediante una <b>Black List.</b>
        </p>
      </div>

      <div className={Style.colRight}>
        <form
          action=""
          className={Style.formContent}
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="tittle"> ¡Empecemos! </h1>
          <p> Coloca aquí la dirección de correo electrónico: </p>
          <input
            type="email"
            placeholder="Dirección de Correo"
            className={Style.btnEmail}
            onChange={(e) => handleChange(e)}
          />
          <input type="submit" value="Buscar" className={Style.btnSubmit} />
        </form>
      </div>
    </section>
  );
}
