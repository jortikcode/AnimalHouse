import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";


export default function Games(){
    return (
        <>
            <div className="flex items-center pt-10 flex-col gap-y-8 dark:bg-black min-h-screen w-full">
                <h1 className="dark:text-yellow-400 font-extrabold md:text-3xl text-2xl text-center"> Divertiti con i nostri bellissimi giochi! </h1>
                <div className="flex flex-col gap-y-16 w-full justify-center">
                    <span className="dark:text-yellow-400 md:text-3xl text-2xl text-center"> 
                        Seleziona uno tra i seguenti giochi: 
                    </span>
                    <ul className="flex flex-row md:gap-x-8 gap-x-3 justify-center w-full">
                        <div className="flex md:flex-row flex-col md:gap-x-8 gap-x-5 justify-center md:gap-y-0 gap-y-16 items-center">
                            <motion.li whileHover={{scale: 1.2}}> <Link className=" p-4 bg-yellow-400 font-bold rounded-full text-black" to='/game/games/hangman'> Impiccato </Link> </motion.li>
                            <motion.li whileHover={{scale: 1.2}}> <Link className=" p-4 bg-yellow-400 font-bold rounded-full text-black" to='/game/games/memory'> Memoria </Link> </motion.li>
                        </div>
                        <div className="flex md:flex-row flex-col md:gap-x-8 justify-center md:gap-y-0 gap-y-16 items-center">
                            <motion.li whileHover={{scale: 1.2}}> <Link className=" p-4 bg-yellow-400 font-bold rounded-full text-black" to='/game/games/quiz'> Quiz </Link> </motion.li>
                            <motion.li whileHover={{scale: 1.2}}> <Link className=" p-4 bg-yellow-400 font-bold rounded-full text-black" to='/game/games/difference'> Differenze </Link> </motion.li>
                        </div>
                    </ul>
                </div>
                <Outlet />
            </div>
        </>
    );
}