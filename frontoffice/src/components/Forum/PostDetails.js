import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MagnifyingGlass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePost,
  getPostByID,
  updatePost,
  waitingGetPostById,
} from "../../app/postsSlice";
import { getUserByID, waitingUserByID } from "../../app/usersSlice";
import BackArrow from "../Marketplace/BackArrow";
import postCategories from "./categories.json"

const PostDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loadingPost, post } = useSelector((state) => state.posts);
  const { loadUserByID, userSearched, user, isLogged } = useSelector(state => state.auth);
  const [formVisible, setFormVisible] = useState(false);
  const { title, text, category, createdBy, createdAt } = post;

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  const onSubmit = (data) => {
    dispatch(updatePost({
      _id: id,
      ...data
    }))
    reset(data)
  };

  const toggleDelete = (id) => {
    dispatch(deletePost({ id }));
    navigate("/forum");
  };

  useEffect(() => {
    dispatch(waitingGetPostById());
    dispatch(getPostByID({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (JSON.stringify(post) !== JSON.stringify({}))
      reset({
        title: post.title,
        text: post.text,
        category: post.category
      })
  }, [ post, reset ] )

  useEffect(() => {
    if (createdBy) {
      dispatch(waitingUserByID());
      dispatch(getUserByID({ id: createdBy }));
    }
  }, [dispatch, createdBy]);


  if (!isLogged) return <></>;

  if (
    loadingPost ||
    loadUserByID ||
    JSON.stringify({}) === JSON.stringify(userSearched)
  )
    return (
      <div className="flex mt-9 justify-center flex-col items-center">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#FBBF24"
        />
        <small> Aspettando info sul post dai nostri uffici... </small>
      </div>
    );
  return (
    <div className="flex mt-20 justify-center flex-col items-center gap-y-8">
      <BackArrow path="/forum" />
      <div className="rounded-xl p-5 flex flex-col w-fit max-w-[40rem] bg-yellow-400 border-4 border-black">
        <div className="flex md:flex-row flex-col items-center justify-between border-b-4 border-white md:space-x-8 md:space-y-0 space-y-4 pb-3">
          <div className="flex flex-col md:items-baseline items-center">
            <p className="font-bold text-3xl text-amber-800 tracking-tighter">
              {" "}
              {userSearched.name} {userSearched.surname}{" "}
            </p>
            <span
              className={`max-w-24 w-fit text-center p-2 rounded-full text-xs ${
                userSearched.isVip
                  ? "font-bold bg-black text-yellow-400"
                  : "text-black bg-white font-semibold"
              }`}
            >
              {" "}
              {userSearched.isVip ? "VIP" : "Abbonamento gratis"}{" "}
            </span>
          </div>
          <span className="rounded-2xl border bg-white px-2 py-1 text-center font-semibold tracking-wider">
            {category}
          </span>
          <p className="text-black"> {new Date(createdAt).toLocaleString()} </p>
        </div>

        <div className="mt-4 mb-6">
          <p className="mb-3 text-4xl font-bold tracking-tighter">{title}</p>
          <p className="text-lg">{text}</p>
        </div>
      </div>
      {user.userInfo["_id"] === post.createdBy && (
        <div className="flex flex-col space-y-2">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            type="button"
            onClick={(e) => setFormVisible((old) => !old)}
          >
            { !formVisible ? "Modifica" : "Annulla" }
          </button>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            type="button"
            onClick={(e) => toggleDelete(id)}
          >
            {" "}
            Elimina{" "}
          </button>
        </div>
      )}
      {formVisible && (
        <form
          autoComplete="off"
          className="bg-white shadow-lg w-[500px] max-w-full rounded pt-6 pb-8 mb-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 w-full px-8 pt-8 items-center">
            <div className="mb-4">
              <label
                className="text-lg block text-gray-700 font-bold mb-2"
                htmlFor="title"
              >
                Titolo del post
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder=""
                {...register("title", {
                  maxLength: {
                    value: 50,
                    message:
                      "Un titolo non può essere più lungo di 50 caratteri",
                  },
                })}
              />
              <ErrorMessage
                as={<p className="text-red-600" />}
                errors={errors}
                name="title"
              />
            </div>

            <div className="mb-4">
              <label
                className="text-lg block text-gray-700 font-bold mb-2"
                htmlFor="text"
              >
                Corpo del post
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="text"
                {...register("text", {
                  required: "Il post deve contenere un testo",
                })}
              />
              <ErrorMessage
                as={<p className="text-red-600" />}
                errors={errors}
                name="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="text-lg block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Categoria
              </label>

              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="category"
                {...register("category", {
                  required: "Selezionare una categoria in cui postare",
                })}
              >
                {postCategories.map((category, index) => (
                  <option value={category} key={index}>
                    {" "}
                    {category}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="justify-center flex">
            <input
              value="Salva modifica"
              className="bg-yellow-400 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default PostDetails;
