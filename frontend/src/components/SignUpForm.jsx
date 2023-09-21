import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import IconsForm from "./IconsForm";
import FormSwitchLink from "./FormSwitchLink";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchingDataComplete,
  usePlanPremium,
  usePlanTop,
} from "../hooks/usePlan";

import styles from "./Forms.module.css";
import DropdownBar from "./DropdownBar";

export default function Form() {
  const [selectedOption, setSelectedOption] = useState("1");
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const userObject = localStorage.getItem(localStorage.key(0));

  const completeOrder = async () => {
    // Get the URL parameters
    if (urlParams) {
      // Access individual parameters
      const token = urlParams.get("token");
      const payerID = urlParams.get("PayerID");

      // Do something with the parameters
      try {
        const request = {
          token: token,
          payerID: payerID,
        };
        const requestString = JSON.stringify(request);
        const params = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestString,
        };
        const data = await fetchingDataComplete(params);
        if (data) {
          alert("Se ha enviado el correo de verificacion");
          navigate("/signup");
        } else alert("Ha habido un error");
      } catch (error) {
        console.error(error);
        navigate("/signup");
      }
    } else alert("Ocurrio un error con el pago");
  };

  const createUser = async () => {
    try {
      const userParams = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: userObject,
      };
      const response = await fetch(
        import.meta.env.VITE_CREATE_USER,
        userParams
      );
      const data = await response.json();
      if (data) {
        localStorage.clear();
        return data;
      } else alert("Error al crear usuario");
    } catch (error) {
      console.error(error);
      navigate("/signup");
    }
  };
  const onLoad = async () => {
    const result = await createUser();
    if (result) completeOrder();
  };

  useEffect(() => {
    if (urlParams && userObject) onLoad();
  }, []);

  const handleChange = (currentValue) => {
    setSelectedOption(currentValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    data.plan = selectedOption;
    const userString = JSON.stringify(data);
    localStorage.setItem("user", userString);
    if (data.plan === "2") usePlanPremium();
    if (data.plan === "3") usePlanTop();
    /*
    //Logica registrar usuario
    const URL = import.meta.env.VITE_CREATE_USER;
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(URL, configurationObject)
      .then((res) => JSON.parse(res))
      .then((server_res) => console.log(server_res))
      .catch((err) => console.log(err));
    */
    reset();
  });

  const nameOptions = {
    required: {
      value: true,
      message: "El nombre es requerido",
    },
    minLength: {
      value: 3,
      message: "El nombre debe tener mínimo 3 caracteres",
    },
    maxLength: {
      value: 20,
      message: "El máximo de caracteres es de 20",
    },
  };

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

  const passwordOptions = {
    required: {
      value: true,
      message: "La contraseña es requerida",
    },
    minLength: {
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
  };

  const confirmPasswordOptions = {
    required: {
      value: true,
      message: "La contraseña no coincide",
    },
    validate: (value) =>
      value === watch("password") || "La contraseña no coincide",
  };

  return (
    <>
      <Link className={styles.btn} to="/">
        Inicio
      </Link>
      <div className={styles.contentForm}>
        <form onSubmit={onSubmit}>
          <p className={styles.title}>crear cuenta</p>
          <IconsForm type="signup" />
          <article className={styles.inputGroup}>
            <IconsForm type="name" />

            <input
              type="text"
              placeholder="Ingresa tu nombre"
              autoComplete="off"
              {...register("name", nameOptions)}
            />
          </article>
          {errors.name && <span>{errors.name.message}</span>}

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
              placeholder="Crear contraseña"
              {...register("password", passwordOptions)}
            />
          </article>
          {errors.password && <span>{errors.password.message}</span>}

          <article className={styles.inputGroup}>
            <IconsForm type="confirmPassword" />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              {...register("confirmPassword", confirmPasswordOptions)}
            />
          </article>
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}

          <DropdownBar handleChange={handleChange} />

          <button>continuar</button>

          <FormSwitchLink
            isSignUp
            spanText="¿Tienes cuenta?"
            linkText="Inicia sesión"
            to="/login"
          />
        </form>
      </div>
    </>
  );
}
