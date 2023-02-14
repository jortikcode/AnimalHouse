import { Link, Outlet } from "react-router-dom"
import personalItems from './data/personalItems.json'

const PersonalArea = () => {
    return (
    <>
    <h2 className="py-8 text-center font-bold text-3xl"> Area utente </h2>
    <ul className="flex md:flex-row flex-col items-center md:space-x-8 justify-center space-y-3">
            {personalItems.map((item,index) => <li className="p-2" key={index}> <Link className="text-xl p-2 bg-gray-100 hover:bg-gray-400 text-sky-700 font-semibold rounded-lg" to={item.link}> {item.value} </Link> </li>)}
        </ul>
    
    <div className="flex flex-col items-center justify-center mt-12">
        <Outlet />
    </div>
    </>)
}

export default PersonalArea