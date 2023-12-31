import { useForm } from "react-hook-form";
import IconsForm from "./IconsForm";
import FormSwitchLink from "./FormSwitchLink";
import styles from "./Forms.module.css";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import getTokenAndUser from "../hooks/useLocalStorage";

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  const client = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    // Logic for signing in
    const { user, error } = await client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setErrorMsg(true);
      console.error("Login failed:", error);
      if (error.message !== "Invalid login credentials") {
        alert("Error: " + error.message);
      }
    } else {
      console.log("Login successful!");
      let userObject = getTokenAndUser();
      const { data, error } = await client
        .from("users")
        .select("fk_plans")
        .eq("email", userObject.userEmail)
        .limit(1);
      if (error) {
        console.error(error);
        alert("Error: " + error.message);
        return;
      }
      localStorage.setItem("fk_plan", data[0].fk_plans);
      navigate("/");
      reset();
    }
  });

  const emailOptions = {
    required: {
      value: true,
      message: "Escribe un email válido",
    },
  };

  const passwordOptions = {
    required: {
      value: true,
      message: "La contraseña es requerida",
    },
  };

  return (
    <>
      <Link className={styles.btn} to="/">
        Inicio
      </Link>
      <div className={styles.contentForm}>
        <form onSubmit={onSubmit}>
          <p className={styles.title}>iniciar sesion</p>
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

          <article className={styles.inputGroup}>
            <IconsForm type="password" />
            <input
              type="password"
              placeholder="Ingresa contraseña"
              {...register("password", passwordOptions)}
            />
          </article>
          {errors.password && <span>{errors.password.message}</span>}
          {errorMsg && (
            <span style={{ color: "red" }}>
              El usuario o la contraseña son invalidos
            </span>
          )}

          <a
            className={styles.forgot}
            onClick={() => navigate("/forgot_password")}
          >
            ¿Olvidaste tu contraseña?
          </a>

          <button>entrar</button>

          <FormSwitchLink
            spanText="¿No tienes cuenta?"
            linkText="Regístrate"
            to="/signup"
          />
        </form>
      </div>
    </>
  );
}
