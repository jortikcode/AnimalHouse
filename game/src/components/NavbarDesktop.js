import { Link } from 'react-router-dom'

const NavbarDesktop = (props) => {
    return (
        <nav className="hidden bg-white dark:bg-black md:flex w-full h-16 border-b-2 border-gray-200">
            <div className="flex flex-wrap justify-between items-center w-full">
                <Link to="/" className="text-neutral-700 hover:underline">
                    {
                        props.darkMode ? 
                        (<img src={"/images/white-logo.png"} alt="logo" className="ml-4 h-auto rounded-xl w-36 overflow-hidden"/>)
                        :
                        (<img src={"/images/black-logo.png"} alt="logo" className="ml-4 h-auto rounded-xl w-36 overflow-hidden"/>)
                    }
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
                        <button type="button" onClick={props.togglerColorMode}>
                        {props.darkMode ? (<img className={"h-auto w-5"} src={"/images/light-toggle.png"} alt="Light mode toggle icon" />) : 
                                          (<img className={"h-auto w-5"} src={"/images/dark-toggle.png"} alt="Dark mode toggle icon" />)} 
                        </button> 
                    </li>
                </ul>

            </div>
        </nav>
    );
}
export default NavbarDesktop;