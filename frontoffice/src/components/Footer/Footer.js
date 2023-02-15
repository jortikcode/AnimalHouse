const Footer = () => {
    return (
    <footer className="bg-yellow-400 border-t-4 border-black mt-3 text-black w-full flex flex-col md:flex-row md:justify-between items-center text-sm md:h-24 h-28 md:space-y-0 md:px-3">
            <p className="order-2 md:order-1 tracking-wide"> &copy; AnimalHouse, 2023. </p>
            <div className="order-1 md:order-2 py-3 text-center">
                <p className="tracking-wider"> Contributors: </p>
                <ul>
                    <li className="underline tracking-tight"><a href="https://github.com/jortikcode">Juan Guillermo Jaramillo Saa</a></li>
                    <li className="underline tracking-tight"><a href="https://github.com/AlexandruNicolescu00">Alexandru Nicolescu</a></li>
                </ul>
            </div>
    </footer>
    )
}

export default Footer