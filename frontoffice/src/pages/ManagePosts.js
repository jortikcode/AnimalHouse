import { useEffect, useLayoutEffect } from "react";
import { FidgetSpinner } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, waitingGetAllPosts } from "../app/postsSlice";
import Post from "../components/Forum/Post";

const ManagePosts = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts, loadingPosts } = useSelector((state) => state.posts);
  const { _id: createdBy } = user.userInfo;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(waitingGetAllPosts());
    dispatch(getAllPosts({ createdBy }));
  }, [dispatch, createdBy]);

  if (loadingPosts)
    return (
      <div className="flex mt-8 justify-center">
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#EFBB1A", "#EFBB1A", "#EFBB1A"]}
          backgroundColor="#0"
        />
        <small> Caricando i post dai nostri uffici... </small>
      </div>
    );
  if (posts.length === 0)
    return (
      <h2 className="font-bold text-3xl text-center mt-8">
        {" "}
        Non hai scritto in nessuna bacheca
      </h2>
    );
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 mb-8 mt-8 mx-4 items-stretch">
      {posts.map((post, index) => {
        return <Post {...post} key={index} />;
      })}
    </div>
  );
};

export default ManagePosts;
