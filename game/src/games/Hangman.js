import { useState } from 'react'
import { motion } from 'framer-motion';

export default function Hangman(){
    const [start, setStart] = useState(false);

    const switchPlay = (event) => {
        if (start)
            // Reset
            setStart(false);
        else
            // Start
            setStart(true);
    }

    return (
        <>
            <div className="flex flex-col md:pt-16 pt-8 w-full items-center">
                <h2 className="dark:text-white font-semibold text-xl tracking-wide">L'impiccato</h2>
                <motion.button whileHover={{scale: 1.2}} 
                className="dark:bg-amber-700 dark:border-0 border-amber-700 border-4 pt-2 pb-2 pl-4 pr-4 mt-10 dark:text-white font-bold text-amber-700 rounded-lg"
                onClick={switchPlay}>
                    {!start ? "Inizia" : "Stoppa"}
                </motion.button>
                {start && (
                    <div className="flex w-full items-center justify-center pt-8">
                        <span className="dark:text-white rounded-sm">
                            Gioco iniziato
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}