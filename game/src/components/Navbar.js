import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

const Navbar = (props) => {
    return (
        <>
            <NavbarDesktop togglerColorMode={props.togglerColorMode} darkMode={props.darkMode} />
            <NavbarMobile />
        </>
    );
}
export default Navbar;