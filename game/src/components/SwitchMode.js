import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { themeAction } from "../actions/customActions"
import { motion } from "framer-motion";


export default function SwitchMode(){
    const { darkMode } = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const toggleColorMode = (event) => {
        /* We need to send the action to do to our reducer */
        dispatch(themeAction(!darkMode));
    }

    useEffect(() => {
        // A switch from light mode to dark mode should occur
        if (darkMode)
            document.getElementById("root").classList.add("dark");
        else
            document.getElementById("root").classList.remove("dark");
    }, [darkMode, dispatch]);

    return (
        <motion.button whileHover={{scale: 1.3}} type="button" onClick={toggleColorMode}>
            <img className={"h-auto w-5"} src={darkMode ? "/images/light-toggle.png" : "/images/dark-toggle.png"} alt="Dark mode toggle icon" />    
        </motion.button> 
    );
}