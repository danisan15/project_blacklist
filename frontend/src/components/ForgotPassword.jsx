import styles from "./Forms.module.css";
import { useForm } from "react-hook-form";
import IconsForm from "./IconsForm";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  const client = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setCounter(60);
    const { res, error } = await client.auth.resetPasswordForEmail(data.email, {
      redirectTo: import.meta.env.VITE_UPDATE_PASSWORD_URL,
    });
    if (error) console.error(`Ha habido un error: ${error}`);
    setSuccessMsg("Se ha enviado el correo de recuperacion.");
  });

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const emailOptions = {
    required: {
      value: true,
      message: "El correo es requerido",
    },
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
      message: "Escribe un email válido",
    },
  };

  return (
    <>
      <Link className={styles.btn} to="/login">
        Volver
      </Link>
      <div className={styles.contentForm}>
        <form onSubmit={onSubmit}>
          <p className={styles.title}>recuperar contraseña</p>
          <IconsForm type="login" />
          <article className={styles.inputGroup}>
            <IconsForm type="email" />
            <input
              type="email"
              placeholder="Ingresa correo"
              autoComplete="off"
              {...register("email", emailOptions)}
            />
          </article>
          {errors.email && <span>{errors.email.message}</span>}
          {successMsg && <span>{successMsg}</span>}
          {counter === 0 ? (
            <button>Enviar</button>
          ) : (
            <button disabled>{counter}</button>
          )}
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
