import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../app/usersSlice";
import { signupObject } from "../../utils/auth";
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InfoTooltip from "./InfoTooltip";

function RegisterCard(){
    const dispatch = useDispatch()
    const { isLogged } = useSelector(state => state.auth)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        dispatch(signup(signupObject(data)))
    };

    useEffect(() => {
        // L'utente e' gia' loggato, lo rimandiamo alla Home
        if (isLogged) 
          navigate("/");
      }, [isLogged, navigate]);
    
    return (
    <> 
    { !isLogged &&
    <div className="flex items-center flex-col">
        <div className="prose"> <h1> Crea Account </h1> </div>
        <form autoComplete="off" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                *Email
            </label>
            <input  
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email"
            type="text" 
            placeholder="Email"
            {...register("email", {
                required: "Email mancante"
            })} />
            <ErrorMessage as={<p className="text-red-600" />} errors={errors} name="email" />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                *Nome
            </label>
            <input  
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="name" 
            type="text" 
            placeholder="Nome"
            {...register("name", {
                required: "Nome mancante"
            })} />
            <ErrorMessage as={<p className="text-red-600" />} errors={errors} name="name" />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                *Cognome
            </label>
            <input  
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="surname" 
            type="text" 
            placeholder="Cognome"
            {...register("surname", {
                required: "Cognome mancante"
            })} />
            <ErrorMessage as={<p className="text-red-600" />} errors={errors} name="surname" />
            </div>

            <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 items-center" htmlFor="password">
                *Password <InfoTooltip message="La password deve contenere una lettera maiuscola, una minuscola, un numero, un carattere non alfanumerico e deve essere lunga almeno otto caratteri" />
            </label>
            <input  
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            type="password" 
            placeholder="Password" 
            {...register("password", {
                required: "Password mancante",
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    message: "Password troppo semplice"
                }
            })}/>
            <ErrorMessage 
            errors={errors} 
            name="password"
            render={(messages) => {
                return (messages &&
                Object.entries(messages).map(([type, message]) => (
                    <p className="text-red-600" key={type}>{message}</p>
                )))
                }
            } />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword">
                *Conferma Password
            </label>
            <input  
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="cpassword" 
            type="password" 
            placeholder="Ripeti Password" 
            {...register("cpassword", {
                required: "Conferma password mancante",
                validate: (val) => {
                        if (watch("password") !== val)
                            return "Le password non combaciano"

                }
            })}/>
            <ErrorMessage 
            errors={errors} 
            name="cpassword"
            render={(messages) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                    <p className="text-red-600" key={type}>{message}</p>
                ))
            } />

            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 mb-4">
                <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Via
                </label>
                <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="address" 
                type="text" 
                placeholder="Via Vestina 67" 
                {...register("via")}/>
                </div>

                <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                    Citta'
                </label>
                <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="city" 
                type="text" 
                placeholder="Montesilvano (PE)" 
                {...register("city")}
                />
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cap">
                    CAP
                </label>
                <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="cap" 
                type="text" 
                placeholder="65015" 
                {...register("cap")}/>
                </div>
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birth">
                *Nascita
            </label>
            <input  
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="birth" 
            type="date" 
            {...register("birth", {
                required: "Data di nascita mancante"
            })}/>
            <ErrorMessage as={<p className="text-red-600" />} errors={errors} name="birth" />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_gender">
            *Genere
            </label>
            <select 
            id="user_gender"  
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("gender", {
                required: "Gender mancante"
            })}>
                <option value="male">Maschio</option>
                <option value="female">Femmina</option>
                <option value="NA">Altro</option>
            </select>
            <ErrorMessage as={<p className="text-red-600" />} errors={errors} name="gender" />
            </div>

            <div className="justify-center flex">
            <input value="Crea" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
            </div>
        </form>
    </div>
    } 
    </>
    )
}

export default RegisterCard;