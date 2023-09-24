import { useEffect, useState } from "react";
import Style from "./Hero.module.css";
import getTokenAndUser from "../hooks/useLocalStorage";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log(isValid);
    setIsValid(0);
  }, [isValid]);

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0) return alert("Inserte el email");
    const userObject = getTokenAndUser();
    console.log(userObject);
    const URL = import.meta.env.VITE_VERIFY_EMAIL_URL;
    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        userEmail: userObject["userEmail"],
      }),
    };
    fetch(URL, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsValid(true);
          setErrorMessage("");
          setSuccessMessage("El email es valido");
        }
        if (!data.message) {
          setIsValid(false);
          setErrorMessage("El email es malicioso");
          setSuccessMessage("");
        }
        if (data.message === null) {
          setIsValid(null);
          setErrorMessage("Se agotaron las solicitudes");
          setSuccessMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Hubo un error al verificar el correo");
        setSuccessMessage("");
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
          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
          {successMessage && (
            <p style={{ color: "green", marginTop: "10px" }}>
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
