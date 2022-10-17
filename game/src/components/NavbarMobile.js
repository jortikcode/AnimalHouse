import { Link } from 'react-router-dom'

const NavbarMobile = () => {
    return (
        <nav className="flex md:hidden w-full">
            <div className="container flex flex-wrap justify-between">
                <Link to="/" className="text-neutral-700 hover:underline">
                    <img src={"/images/black-logo.png"} alt="logo" className="ml-4 h-auto rounded-xl w-36 overflow-hidden"/>
                </Link>
            </div>
        </nav>
    );
}
export default NavbarMobile;