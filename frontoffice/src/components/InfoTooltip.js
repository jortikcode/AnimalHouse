const InfoTooltip = (props) => {
    return (
    <>
        {props.message && 
        (<span className="group relative">
            <span className="absolute w-40 md:w-72 max-w-screen-md top-2 left-3 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100"> 
                {props.message} 
            </span>
            <button className="appearance-none" type="button">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6">
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            </button>
        </span>)
        }
    </>
    )
}

export default InfoTooltip;