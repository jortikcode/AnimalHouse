import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/usersSlice";
import { loginObject } from "../../utils/auth";
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginCard(){
    const dispatch = useDispatch()
    const { isLogged } = useSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = data => {
        dispatch(login(loginObject(data)))
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
        <div className="prose"> <h1> Accedi </h1> </div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
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
                Password
            </label>
            <input  
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            type="password" 
            placeholder="Password"
            {...register("password", {
                required: "Password mancante"
            })} />
            <ErrorMessage as={<p className="text-red-600" />} errors={errors} name="password" />
            </div>

            <div className="justify-center flex">
            <input value="Accedi" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
            </div>
        </form>
    </div>
    } 
    </> 
    )
}

export default LoginCard;