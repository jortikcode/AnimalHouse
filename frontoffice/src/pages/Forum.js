import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPost, firstLoad, getAllPosts, waitingGetAllPosts } from "../app/postsSlice";
import Post from "../components/Forum/Post";
import postCategories from "../components/Forum/categories.json"

const defaultValues = {
  title: "Senza titolo",
  text: "",
  category: postCategories[0],
}


const Forum = () => {
  const dispatch = useDispatch();
  const { posts, pageLoaded } = useSelector(state => state.posts)
  const { user } = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
  })

  const onSubmit = (data) => {
    dispatch(waitingGetAllPosts());
    dispatch(createPost({
      ...data,
      createdBy: user.userInfo["_id"]
    }))
    reset(defaultValues)
  };

  const onSearch = ({ category }) => {
    dispatch(waitingGetAllPosts())
    dispatch(getAllPosts({ category }));
  }

  useEffect(() => {
    // Presumibilmente, stiamo caricando per la prima volta i prodotti da mongo
    if (!pageLoaded) {
      dispatch(firstLoad())
      dispatch(waitingGetAllPosts());
      dispatch(getAllPosts({}));
    }
  }, [dispatch, pageLoaded]);

  return (
    <div className="flex flex-col items-center mt-12">
      <article className="prose tracking-tighter">
        <h1>Bacheca</h1>
      </article>
      <div className="flex justify-center">
        <form
          autoComplete="off"
          className="bg-white shadow-lg w-[700px] max-w-sm rounded pt-6 pb-8 mb-4"
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
                    message: "Un titolo non può essere più lungo di 50 caratteri"
                  }
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
                  required: "Il post deve contenere un testo"
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
                  required: "Selezionare una categoria in cui postare"
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
              value="Crea nuovo post"
              className="bg-yellow-400 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded hover:cursor-pointer"
              type="submit"
            />
          </div>
        </form>
      </div>
      
      <div className="mb-4">
        <label
          className="text-lg block text-gray-700 font-bold mb-2"
          htmlFor="searchCategory"
        >
          Categoria da visualizzare
        </label>

        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="searchCategory"
          onChange={e => {
            onSearch( { category: e.target.value } )
          }}
        >
          <option value="all"> Tutte le categorie </option>
          {postCategories.map((category, index) => (
            <option value={category} key={index}>
              {" "}
              {category}{" "}
            </option>
          ))}
        </select>
      </div>


      <div className="grid md:grid-cols-3 grid-cols-1 mb-8 mt-8 mx-4 items-stretch">
        {posts.map((post, index) => {
          return <Post {...post} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Forum;
