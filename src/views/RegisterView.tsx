import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import type { RegisterForm } from "../types"
import ErrorMessages from "../components/ErrorMessages"
import { toast } from "sonner"
import api from "../config/axios"

export default function RegisterView() {

  const initialValues: RegisterForm = {
    name:'',
    email:'',
    handle:'',
    password:'',
    password_confirmation:''
  }

  const { register, watch, handleSubmit, reset, formState:{errors}} = useForm({defaultValues: initialValues})

  const password = watch('password')

  const handleRegister = async (formData: RegisterForm)=>{
    try{
      const {data} = await api.post(`/api/auth/register`,formData)
      toast.success(data)
      reset()
    }catch(error){
      if(isAxiosError(error)){
        toast.error(error.response?.data.error)
      }
    }
  }
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Crear cuenta</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name",{
              required: "El nombre es obligatorio"
            })}
          />
          {errors.name && <ErrorMessages>{errors.name.message}</ErrorMessages>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email",{
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email no válido",
              },
            })}
          />
          {errors.email && <ErrorMessages>{errors.email.message}</ErrorMessages>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle",{
              required: "El handle es obligatorio",
            })}
          />
          {errors.handle && <ErrorMessages>{errors.handle.message}</ErrorMessages>}

        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password",{
              required: "La contraseña es obligatorio",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && <ErrorMessages>{errors.password.message}</ErrorMessages>}

        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Repetir Contraseña"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation",{
              required: "Repetir la contraseña es obligatorio",
              validate: (value)=> value === password || 'Las contraseñas no coinciden'
            })}
          />
          {errors.password_confirmation && <ErrorMessages>{errors.password_confirmation.message}</ErrorMessages>}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>
      <nav className="mt-10">
        <Link to={'/auth/login'} className="text-center text-white text-lg block">
          ¿Ya tienes Cuenta? Inicia Sesion
        </Link>
      </nav>
    </>
  )
}
