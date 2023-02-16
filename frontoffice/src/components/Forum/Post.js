import { Link } from "react-router-dom";

const Post = ({ _id, title, text, createdAt, category }) => {
  return (
    <div className="flex items-center justify-center bg-yellow-400 text-black">
      <div className="p-8 w-[32rem] max-w-full">
        <div className="flex font-light text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 rotate-90 -ml-2"
            viewBox="0 0 24 24"
            stroke="#0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            />
          </svg>
          {category}
        </div>

        <p className="font-bold text-3xl mt-2">{title}</p>

        <p className="mt-5">Creato il: {new Date(createdAt).toLocaleString()}</p>
        <p className="font-light"> {text} </p>

        <Link to={`/forum/${_id}`} className="bg-white text-black font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group">
          READ MORE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Post;
