import { useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostByID, waitingGetPostById } from "../../app/postsSlice";
import { getUserByID, waitingUserByID } from "../../app/usersSlice";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loadingPost, post } = useSelector((state) => state.posts);
  const { loadUserByID, userSearched } = useSelector(state => state.auth)

  const { title, text, category, createdBy, createdAt } = post;

  useEffect(() => {
    dispatch(waitingGetPostById());
    dispatch(getPostByID({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (createdBy){
      dispatch(waitingUserByID())
      dispatch(getUserByID({ id: createdBy }))
    }
  }, [dispatch, createdBy])
  
  if (loadingPost || loadUserByID || JSON.stringify({}) === JSON.stringify(userSearched))
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
      <div className="rounded-xl border p-5 shadow-md w-96 bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div className="text-lg font-bold text-slate-700"> { userSearched.name } { userSearched.surname } </div>
          </div>
          <div className="flex items-center space-x-8">
            <span className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
              { category }
            </span>
            <div className="text-xs text-neutral-500"> {new Date(createdAt).toLocaleString()} </div>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold">
            { title }
          </div>
          <div className="text-sm text-neutral-600">
            { text }
          </div>
        </div>
      </div>
  );
};

export default PostDetails;
