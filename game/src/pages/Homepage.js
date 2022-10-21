import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';

export default function Homepage(props){
    const { darkMode } = useSelector(state => state.themeReducer);

    const myStyle = {
        'backgroundImage': darkMode ? 'url(/images/homepage-desktop.jpg)' : 'url(/images/homepage-light-desktop.jpg)',
        'backgroundSize': 'cover',
        'backgroundRepeat': 'no-repeat',
        'height': 'calc(100vh - 64px)'
    };
    const headingBorderStyle = {
        'textShadow': darkMode ? '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' : '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white' 
    }
    return (
        
        <>
            <div className="flex justify-center items-center" style={myStyle}>
                <motion.h1 initial={{scale: 0}} animate={{scale:1}} transition={{delay: .4, duration: .2}} className="text-6xl font-bold w-80 text-black  dark:text-white" style={headingBorderStyle}> 
                    Welcome to the AnimalHouse game portal!
                </motion.h1>
            </div>
        </>
    );
}