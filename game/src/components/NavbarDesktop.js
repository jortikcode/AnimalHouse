import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import SwitchMode from './SwitchMode';

const NavbarDesktop = (props) => {
    const { darkMode } = useSelector(state => state.theme);
    return (
        <nav className="hidden bg-white dark:bg-black md:flex w-full h-16 border-b-2 dark:border-white border-black">
            <div className="flex flex-wrap justify-between items-center w-full">
                <Link to="/" className="text-neutral-700 hover:underline">
                    <img src={darkMode ? "/images/white-logo.png" : "/images/black-logo.png"} alt="logo" className="ml-4 h-auto rounded-xl w-36 overflow-hidden"/>
                </Link>
                <ul className="flex flex-column space-x-11 h-full items-center pr-5">
                    <li> <Link to="/" className="text-black dark:text-white hover:underline"> Home </Link> </li>
                    <li> <Link to="/games" className="text-black dark:text-white hover:underline"> Games </Link> </li>
                    
                    {
                        !props.logged_in ? (
                            <>
                                <li> <Link to="/login" className="h-full text-neutral-900 dark:text-white"> Login </Link> </li>
                                <li> <Link to="/signup" className="h-full text-neutral-900 dark:text-white"> Sign up </Link> </li>
                            </>
                        ) :
                        (
                            <>
                                <li> <button type="button" className="h-full"> Log out </button> </li>
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