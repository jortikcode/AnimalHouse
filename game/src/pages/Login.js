import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { loginAttempt } from '../actions/customActions'

export default function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { darkMode } = useSelector(state => state.theme);
    const { loggedIn } = useSelector(state => state.account);

    const submitHandler = (data) => {
        dispatch(loginAttempt(data));
    }

    return (
        <>
            <div
            style={{
                minHeight: "calc(100vh - 64px)",
                heigth: "auto"
            }}
            className="flex flex-col space-y-14 md:space-y-20 h-screen w-full pt-20 md:pt-28 justify-start items-center dark:bg-black relative">
                <div className="flex md:flex-row flex-col items-center md:justify-center">
                    <h1 className="text-4xl md:order-1 order-2 dark:text-yellow-400 font-bold"> Pagina di login </h1>
                    <img alt="white paws icon" src={ darkMode ? "/images/white-paws.png" : "/images/black-paws.png"} className="h-auto w-16 md:order-2 order-1" />
                </div>
                <form className="flex flex-col space-y-5 items-center" onSubmit={handleSubmit(submitHandler)}>
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="email">Email </label>
                    <input className="border rounded p-3" type="text" placeholder="Email" name="email" id="email" {...register("email", {
                        required: "Campo obbligatorio"
                    })}/>
                    {errors.email && 
                    (<span className="dark:text-red-500 text-red">
                        {errors.email.message}
                    </span>)}
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="password">Password </label>
                    <input className="border rounded p-3" type="password" placeholder="Password" name="password" id="password" {...register("password", {
                        required: "Campo obbligatorio"
                    })}/>
                    {errors.password && 
                    (<span className="dark:text-red-500 text-red">
                        {errors.password.message}
                    </span>)}
                    <div className="flex flex-col md:flex-row space-x-2 p-3 items-center">
                        <motion.button whileHover={{scale: 1.1}} className="p-3 pl-4 pr-4 rounded-full bg-sky-400 text-xl text-white" type="submit">Accedi</motion.button>
                        <Link to="/passwordrecover" className="p-3 rounded-full text-lg text-sky-400" type="button">Dimenticato la password?</Link>
                    </div>
                    
                </form>
            </div>
        </>
    );
}