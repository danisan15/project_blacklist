import { useForm } from "react-hook-form";
import IconsForm from "./IconsForm";
import FormSwitchLink from "./FormSwitchLink";
import styles from "./Forms.module.css";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
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

        <button>continuar</button>

        <FormSwitchLink
          isSignUp
          spanText="¿Tienes cuenta?"
          linkText="Inicia sesión"
          to="/login"
        />
      </form>
    </div>
  );
}
