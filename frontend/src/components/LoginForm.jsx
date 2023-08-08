import { useForm } from 'react-hook-form';
import IconsForm from './IconsForm';
import FormButton from './FormSwitchLink';
import styles from './Forms.module.css'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors } } = useForm();

  const onSubmit = handleSubmit(data => {
    //logica iniciar sesion
    console.log(data);
    reset();
  });

  console.log('errores', errors)

  const emailOptions = {
    required: {
      value: true,
      message:'Escribe un email válido'
    }
  }

  const passwordOptions = {
    required: {
      value: true,
      message:"La contraseña es requerida"
    }
  }
  return (

    <div className={styles.contentForm}>
      <form onSubmit={onSubmit}>
        <p className={styles.title}>iniciar sesion</p>
        <IconsForm type='login' />
        <article className={styles.inputGroup}>
          <IconsForm type="email" />
          <input type="email" placeholder='Ingresa correo' autoComplete='off'{...register("email", emailOptions)} />
        </article>
        {errors.email && <span>{errors.email.message}</span>}

        <article className={styles.inputGroup}>
          <IconsForm type="password" />
          <input type="password" placeholder='Ingresa contraseña' {...register("password", passwordOptions)} />
        </article>
        {errors.password && <span>{errors.password.message}</span>}

        <a href="" className={styles.forgot}>
          ¿Olvidaste tu contraseña?
        </a>

        <button>
          entrar
        </button>

        <FormButton spanText='¿No tienes cuenta?' linkText='Regístrate' />
      </form>
    </div>

  )
}