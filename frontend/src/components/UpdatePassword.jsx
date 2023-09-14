import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Form, useForm } from "react-hook-form";

import IconsForm from "./IconsForm";
import styles from "./Forms.module.css";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const client = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { res, error } = await client.auth.updateUser({
      password: data.password,
    });
    if (error) console.error(`Ha ocurrido un error: ${error}`);
    console.log(res);
    navigate("/login");
  });

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
        <p className={styles.title}>introduzca la contraseña</p>
        <IconsForm type="signup" />
        <article className={styles.inputGroup}>
          <IconsForm type="password" />
          <input
            type="password"
            placeholder="Ingresa nueva contraseña"
            autoComplete="off"
            {...register("password", passwordOptions)}
          />
        </article>
        {errors.password && <span>{errors.password.message}</span>}

        <article className={styles.inputGroup}>
          <IconsForm type="password" />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("confirmPassword", confirmPasswordOptions)}
          />
        </article>
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}

        <button></button>
      </form>
    </div>
  );
};

export default UpdatePassword;
