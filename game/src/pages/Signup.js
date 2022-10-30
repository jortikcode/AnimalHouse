import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { registerAttempt } from '../actions/customActions'



export default function Signup(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { darkMode } = useSelector(state => state.theme);
    const { loggedIn } = useSelector(state => state.account);


    const submitHandler = (data) => {
        dispatch(registerAttempt(data));
    }

    return (
        <>
            <div
            style={{
                minHeight: "calc(100vh - 64px)",
                height: "auto"
            }}  
            className="flex flex-col space-y-14 md:space-y-20 h-screen w-full pt-20 md:pt-32 justify-start items-center dark:bg-black pb-20">
                <div className="flex md:flex-row flex-col items-center md:justify-center">
                    <h1 className="text-4xl md:order-1 order-2 dark:text-yellow-400 font-bold"> Unisciti a noi! </h1>
                    <img alt="white paws icon" src={ darkMode ? "/images/white-paws.png" : "/images/black-paws.png"} className="pl-2 h-auto w-16 md:order-2 order-1" />
                </div>
                <form className="w-4/5 md:w-96 flex flex-col space-y-5" onSubmit={handleSubmit(submitHandler)}>
                <label className="text-center dark:text-white text-xl p-3" htmlFor="email">Email </label>
                    <input className="border rounded p-3" type="text" placeholder="Email" name="email" id="email" {
                        ...register("email", {
                            required: "Email obbligatoria"
                        })}/>
                    {errors.email && <p className="text-center text-red-600 dark:text-red-400"> {errors.email.message} </p>}
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="password">Password </label>
                    <input className="border rounded p-3" type="password" placeholder="Password" name="password" id="password" {
                        ...register("password", {
                            required: "Password obbligatoria",
                            pattern: {
                                value: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'),
                                message: "La password deve contenere come minimo 8 caratteri tra cui almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale"  
                            }
                        })}/>
                    {errors.password && <p className="text-center text-red-600 dark:text-red-400"> {errors.password.message} </p>}

                    <label className="text-center dark:text-white text-xl p-3" htmlFor="name">Nome </label>
                    <input className="border md:w-5/5 rounded p-3" type="text" placeholder="Insert your name" name="name" id="name" {
                        ...register("name", {
                            required: "Nome obbligatorio"
                        })}/>
                    {errors.name && <p className="text-center text-red-600 dark:text-red-400"> {errors.name.message} </p>}

                    <label className="text-center dark:text-white text-xl p-3" htmlFor="surname">Surname </label>
                    <input className="border rounded p-3" type="text" placeholder="Insert your surname" name="surname" id="surname" {
                        ...register("surname", {
                            required: "Cognome obbligatorio"
                        })}/>
                    {errors.surname && <p className="text-center text-red-600 dark:text-red-400"> {errors.surname.message} </p>}
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="address">Indirizzo </label>
                    <input className="border rounded p-3" type="text" placeholder="Insert your address" name="address" id="address" {
                        ...register("address", {
                            required: "Indirizzo obbligatorio"
                        })}/>
                    {errors.address && <p className="text-center text-red-600 dark:text-red-400"> {errors.address.message} </p>}
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="city">Citta' </label>
                    <input className="border rounded p-3" type="text" placeholder="Insert your city" name="city" id="city" {
                        ...register("city", {
                            required: "Citta' obbligatoria"
                        })}/>
                    {errors.city && <p className="text-center text-red-600 dark:text-red-400"> {errors.city.message} </p>}
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="cap">CAP </label>
                    <input className="border rounded p-3" type="text" placeholder="Insert your cap" name="cap" id="cap" {
                        ...register("cap", {
                            required: "CAP obbligatorio"
                        })}/>
                    {errors.cap && <p className="text-center text-red-600 dark:text-red-400"> {errors.cap.message} </p>}
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="birth">Data di nascita </label>
                    <input className="border rounded p-3" type="date" placeholder="Insert your birth date" name="birth" id="birth" {
                        ...register("birth", {
                            required: "Data di nascita obbligatoria"
                        })}/>
                    {errors.birth && <p className="text-center text-red-600 dark:text-red-400"> {errors.birth.message} </p>}
                    <label className="text-center dark:text-white text-xl p-3" htmlFor="gender">Genere </label>
                    <select className="border rounded p-3" type="date" name="gender" id="gender" {
                        ...register("gender", {
                            required: "Genere obbligatorio"
                        })}>
                        <option value="NO"> ---- </option>
                        <option value="Maschio">Maschile</option>
                        <option value="Femmina">Femminile</option>
                        <option value="Altro">Preferisco non dirlo</option>
                    </select>
                    {errors.gender && <p className="text-center text-red-600 dark:text-red-400"> {errors.gender.message} </p>}

                    <div className="flex flex-row space-x-2 pt-3 justify-center">
                        <button className="p-3 rounded-full bg-sky-400 text-xl text-white" type="submit">Registrati</button>
                    </div>
                    
                </form>
            </div>
        </>
    );
}