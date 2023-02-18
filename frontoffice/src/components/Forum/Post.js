import { Link } from "react-router-dom";

const Post = ({ _id, title, text, createdAt, createdBy, category }) => {
  return (
    <div className={`flex items-center justify-center ${createdBy.isVip ? "bg-black text-yellow-400 border-red-700" : "bg-yellow-400 text-black border-black" } border-4  rounded-xl my-4 mx-4`}>
      <div className="p-8 w-[23rem] max-w-full">
        <p className="flex text-sm rounded-xl w-fit p-2 bg-yellow-400 text-black">
          {category}
        </p>

        <p className="font-bold text-3xl mt-2">{title}</p>

        <p className="mt-5">Creato il: {new Date(createdAt).toLocaleString()}</p>
        <p className="font-light truncate"> {text} </p>

        <Link to={`/forum/${_id}`} className="bg-yellow-500 text-black font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group">
          In dettaglio
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
