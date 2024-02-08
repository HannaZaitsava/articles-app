import { React, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../UI/button/CustomButton";
import AvatarShortInfo from "../users/AvatarShortInfo";
import SaveArticleButton from "../../UI/button/SaveArticleButton";
import { useAuth } from "../../context/AuthContext";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDeletePostMutation } from "../../../redux/api/postsApi";
import { useSelector } from "react-redux/es/hooks/useSelector";

const PostListItem = (props) => {
    //const { authUser } = useAuth();
    //const authUser = {roles:[]};
    const { authUserId } = useSelector((state) => state.authData);

    const [deletePost] = useDeletePostMutation();

    const [savedTotalCount, setSavedTotalCount] = useState(0);
    const [saved, setSaved] = useState(false);

    const like = () => {
        saved
            ? setSavedTotalCount((prev) => prev - 1)
            : setSavedTotalCount((prev) => prev + 1);
        setSaved((prev) => !prev);
    };

    const hangleEditPost = () => {
        props.handlechange(props.post);
        props.setIsModalWindowOpen();
    };

    return (
        <>
            <article className="relative flex flex-col items-start justify-between flex-grow lg:max-w-sm p-4 sm:rounded-xl  border-2 bg-white hover:bg-gray-100">
                {/* <Suspense
          fallback={<Skeleton containerClassName="flex-1" count={10} />}
        > */}
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex items-center gap-x-4 text-xs h-1/5 w-full">
                        <time
                            dateTime={props.post.publicationDate}
                            className="text-gray-500"
                        >
                            {new Date(
                                props.post.publicationDate
                            ).toLocaleDateString()}
                        </time>
                        <Link
                            to={`/posts/${props.post.id}`}
                            className="relative rounded-md bg-gray-200 py-1.5 px-3 font-medium text-gray-600 hover:bg-white border-2 border-gray-200"
                        >
                            {props.post.postCategory?.name}
                        </Link>
                    </div>

                    <div>
                        <SaveArticleButton
                            // disable button
                            onClickHandler={like}
                            saved={saved}
                            savedTotalCount={savedTotalCount}
                        ></SaveArticleButton>
                    </div>
                </div>

                <div className="group flex:1 w-full mt-1">
                    <Link
                        to={`/posts/${props.post.id}`}
                        className="h-max mt-3 text-sm sm:text-base font-bold leading-6 text-gray-900 line-clamp-3"
                    >
                        {props.post.title}
                    </Link>
                    <div className="mt-5 text-sm sm:text-base leading-6 text-gray-600 line-clamp-3">
                        {props.post.body}
                    </div>
                </div>

                <div className="w-full mt-8">
                    <AvatarShortInfo user={props.post.user}></AvatarShortInfo>

                    {!!authUserId &&
                        authUserId === props.post.userId && (
                            <div className="flex flex-row items-center justify-end w-full">
                                <CustomButton
                                    img={
                                        <PencilSquareIcon className="h-6 w-6"></PencilSquareIcon>
                                    }
                                    onClick={() => {
                                        hangleEditPost();
                                    }}
                                ></CustomButton>
                                <CustomButton
                                    img={
                                        <TrashIcon className="h-6 w-6"></TrashIcon>
                                    }
                                    onClick={() => deletePost(props.post.id)}
                                ></CustomButton>
                            </div>
                        )}
                </div>
                {/* </Suspense> */}
            </article>
        </>
    );
};

export default PostListItem;
