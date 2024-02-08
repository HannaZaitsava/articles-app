import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPostQuery } from "../../../redux/api/postsApi";
// import PortalModalWindow from './../../UI/modalWindow/PortalModalWindow';
// import PostForm from './PostForm';
import Loader from "./../../UI/loader/Loader";
import AvatarShortInfo from "./../users/AvatarShortInfo";
import SaveArticleButton from "./../../UI/button/SaveArticleButton";
import CommentsListContainer from "./../comments/CommentsListContainer";

function PostContainer(props) {
    //const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);

    const params = useParams();

    const [savedCount, setSavedCount] = useState(0);
    const [saved, setSaved] = useState(false);

    const like = () => {
        saved ? setSavedCount(savedCount - 1) : setSavedCount(savedCount + 1);
        saved ? setSaved(false) : setSaved(true);
    };

    const {
        data: post,
        isLoading: isPostLoading,
        isFetching: isPostFetching,
        isError: isPostError,
        error: postError,
    } = useGetPostQuery({
        id: params.id,
        _expand: ["user", "postCategory"],
    });

    if (isPostError)
        return (
            <div className="text-center flex justify-center">
                {/* ///TODO 404 */}
                <h1 className="error">Error! {postError.status}</h1>
            </div>
        );

    return (
        <div
            id="postContainer"
            className="md:border-2 rounded md:rounded-none border-gray-300 my-2 md:my-4"
        >
            {/* {loadingPostError && <h1>Error: {loadingPostError}</h1>} */}
            {isPostFetching ? (
                <Loader />
            ) : (
                <div
                    id="postData"
                    className="flex flex-col md:flex-row gap-x-0"
                >
                    <div
                        id="postContent"
                        className="relative flex flex-col items-start p-6 bg-white max-md:border-[1px] md:border-r-2 border-gray-400 md:border-gray-300 md:w-3/5 "
                    >
                        <div className="flex flex-row items-center justify-between w-full">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time
                                    dateTime={post.publicationDate}
                                    className="text-gray-500"
                                >
                                    {new Date(
                                        post.publicationDate
                                    ).toLocaleDateString()}
                                </time>
                                <Link
                                    to="#"
                                    className="relative rounded-md bg-gray-200 py-1.5 px-3 font-medium text-gray-600 hover:bg-white"
                                >
                                    {post.postCategory?.name}
                                </Link>
                            </div>

                            <div>
                                <SaveArticleButton
                                    // disable button
                                    onClickHandler={like}
                                    saved={saved}
                                    savedCount={savedCount}
                                ></SaveArticleButton>
                            </div>
                        </div>

                        {post && post.user && (
                            <div className="mt-2">
                                <AvatarShortInfo
                                    user={post.user}
                                    //userId={post.userId}
                                    // userName={post.username}
                                    // email={post.email}
                                ></AvatarShortInfo>
                            </div>
                        )}

                        <div className="group relative m-1">
                            <div className="mt-3 text-lg font-bold leading-6 text-gray-900">
                                {post.title}
                            </div>
                            <div className=" mt-5 text-sm sm:text-base leading-6 text-gray-600">
                                {post.body}
                            </div>
                        </div>
                    </div>

                    <div id="postComments" className="md:w-2/5 bg-gray-100">
                        <CommentsListContainer
                            itemsLimitPerPage={3}
                            fetchData={{
                                //fetchDataFunc: PostService.getPosts,
                                fetchDataArgs: { postId: params.id },
                            }}
                        ></CommentsListContainer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostContainer;
