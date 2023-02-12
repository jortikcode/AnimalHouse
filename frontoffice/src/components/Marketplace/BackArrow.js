import { Link } from "react-router-dom";

const BackArrow = () => {
  return (
    <Link 
    to="/marketplace"
    className="hover:bg-gray-100 rounded-full">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
        </svg>
    </Link>
  );
};

export default BackArrow
