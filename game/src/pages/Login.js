import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { loginAttempt } from '../actions/customActions'

export default function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { darkMode } = useSelector(state => state.theme);
    const { loggedIn } = useSelector(state => state.account);
    console.log(loggedIn);

    const submitHandler = (data) => {
        dispatch(loginAttempt(data));
    }

    return (
        <>
            <div
            style={{
                height: "calc(100vh - 64px)"
            }}  
            className="flex flex-col space-y-14 md:space-y-20 h-screen w-full pt-20 md:pt-32 justify-start items-center dark:bg-black">
                <div className="flex md:flex-row flex-col items-center md:justify-center">
                    <h1 className="text-4xl md:order-1 order-2 dark:text-white"> Login page </h1>
                    <img alt="white paws icon" src={ darkMode ? "/images/white-paws.png" : "/images/black-paws.png"} className="h-auto w-16 md:order-2 order-1" />
                </div>
                <form className="flex flex-col space-y-5" onSubmit={handleSubmit(submitHandler)}>
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="email">Email </label>
                    <input className="border rounded p-3" type="text" placeholder="Email" name="email" id="email" {...register("email")}/>
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="password">Password </label>
                    <input className="border rounded p-3" type="password" placeholder="Password" name="password" id="password" {...register("password")}/>
                    <div className="flex flex-row space-x-2 p-3">
                        <button className="p-3 rounded-full bg-sky-400 text-xl text-white" type="submit">Sign in</button>
                        <Link to="/passwordrecover" className="p-3 rounded-full text-lg text-sky-400" type="button">Forgot the password?</Link>
                    </div>
                    
                </form>
            </div>
        </>
    );
}