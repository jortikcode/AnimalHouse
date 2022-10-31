import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import SwitchMode from './SwitchMode';
import { motion } from 'framer-motion'


const NavbarDesktop = (props) => {
    const { darkMode } = useSelector(state => state.theme);

    return (
        <nav className="hidden bg-yellow-400 dark:bg-black md:flex w-full h-16  ">
            <div className="flex flex-wrap justify-between items-center w-full">
                <Link to="/game/login" className="text-neutral-700 hover:underline">
                    <img src={darkMode ? "/images/white-logo.png" : "/images/black-logo.png"} alt="logo" className="ml-4 h-auto rounded-xl w-36 overflow-hidden"/>
                </Link>
                <ul className="flex flex-column space-x-11 h-full items-center pr-5">
                    <motion.li whileHover={{scale: 1.3}}> <Link to="/game"  className="text-black dark:text-yellow-400 font-bold"> Home </Link> </motion.li>
                    <motion.li whileHover={{scale: 1.3}}> <Link to="/game/games" className="text-black dark:text-yellow-400 font-bold"> Giochi </Link> </motion.li>
                    
                    {
                        !props.logged_in ? (
                            <>
                                <motion.li whileHover={{scale: 1.3}}> <Link to="/game/login" className="h-full text-neutral-900 dark:text-yellow-400 font-bold"> Accedi </Link> </motion.li>
                                <motion.li whileHover={{scale: 1.3}}> <Link to="/game/signup" className="h-full text-neutral-900 dark:text-yellow-400 font-bold"> Registrati </Link> </motion.li>
                            </>
                        ) :
                        (
                            <>
                                <li> <button type="button" className="h-full text-neutral-900 dark:text-yellow-400 hover:underline font-bold"> Esci </button> </li>
                            </>
                        )
                    }
                    <li> 
                        <SwitchMode />
                    </li>
                </ul>

            </div>
        </nav>
    );
}
export default NavbarDesktop;