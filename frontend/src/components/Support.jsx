import { useForm } from 'react-hook-form';
import IconsForm from './IconsForm';
import styles from './Forms.module.css'
import { useState } from "react";
import Swal from "sweetalert2";

export default function Support() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Date, setDate] = useState("");
  

  //Alertas Formulario
  const successAlert=()=>{
    Swal.fire({
      icon: "success",
      title: "¡Está todo listo!",
      text: "Su cita se agendó correctamente. Recibirá un correo electrónico con más detalles",
      confirmButtonText: 'Entendido'
    })
    }
  const errorAlert=()=>{
      Swal.fire({
        icon: "warning",
        title: "¡Lo sentimos! Algo ha salido mal",
        text: "Estaremos trabajado para restablecer el servicio",
        confirmButtonText: 'Entendido'
      })
    }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Logica agendar cita usuario
  const onSubmit = handleSubmit(e => {
    const options = {
      method: "POST",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name,
        Email,
        Phone,
        Date
      }),
    };
    fetch("https://sheet.best/api/sheets/bb00a9f7-eb60-45d5-af0c-80b4feae51ce", options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setName("");
          setEmail("");
          setPhone("");
          setDate("");
        }
        successAlert(res);
          })
        .catch((error) => {
          errorAlert(error);
          })
        .finally(() => setWaiting(false));
  })


  //Condicionales para inputs del formulario
  const nameOptions = {
    required: {
      value: true,
      message: "El nombre es requerido",
    },
    minLength: {
      value: 3,
      message: "El nombre debe tener mínimo 3 caracteres"
    },
    maxLength: {
      value: 30,
      message: "El máximo de caracteres es de 30"
    }
  }

  const emailOptions = {
    required: {
      value: true,
      message: "El correo es requerido"
    },
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
      message: "Escribe un email válido"
    }
  }

  const numberOptions = {
    required: {
      value: true,
      message: "El teléfono es requerido"
    },
    pattern: {
      value: /^\d{7,14}$/,
      message: "El teléfono solo debe contener de 7 a 14 numeros"
    }
  }

  const dateOptions = {
    required: {
      value: true,
      message: 'La Fecha es requerida'
    }
  }
  

  return (
    <div className={styles.contentForm}>
      <form onSubmit={onSubmit} id='formulario'>
        <p className={styles.title}>¿Necesitas ayuda? <br/> Agenda tu cita </p>

        <article className={styles.inputGroup}>
          <IconsForm type="name" />
          <input 
          type="text" 
          placeholder='Ingresa tu nombre' 
          autoComplete='off' {...register("name", nameOptions)}
          value={Name} 
          onChange={({ target }) => setName(target.value)} />
        </article>

        {errors.name && <span>{errors.name.message}</span>}

        <article className={styles.inputGroup}>
          <IconsForm type="email" />
          <input
          type="email"
          placeholder='Ingresa correo'
          autoComplete='off'{...register("email", emailOptions)}
          value={Email}
          onChange={({ target }) => setEmail(target.value)} />
        </article>

        {errors.email && <span>{errors.email.message}</span>}

        <article className={styles.inputGroup}>
          <IconsForm type="phone" />
          <input
          type="text"
          placeholder='Ingresa tu número de teléfono'
          autoComplete='off'{...register("number", numberOptions)}
          value={Phone}
          onChange={({ target }) => setPhone(target.value)} />
        </article>

        {errors.number && <span>{errors.number.message}</span>}

        <p className={styles.title} >Selecciona una fecha disponible: </p>
        
        <article className={styles.inputGroup}>
          <IconsForm type="" />
          <input
          type="date"
          autoComplete='off' {...register("date", dateOptions)}
          value={Date}
          onChange={({ target }) => setDate(target.value)}/>
        </article>

        {errors.date && <span>{errors.date.message}</span>}

        <button type='submit'> Solicitar </button>

      </form>
    </div >
  )
}
