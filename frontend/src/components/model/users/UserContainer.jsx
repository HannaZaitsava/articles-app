import React from "react";
import { useParams } from "react-router-dom";
import AvatarFullInfo from './AvatarFullInfo';
import PostListContainer from './../posts/PostListContainer';
import Loader from './../../UI/loader/Loader';
import { useGetUserQuery } from "../../../redux/api/usersApi";

const UserContainer = () => {
    const params = useParams();

    const {
        data: user,
        //isLoading: isUserLoading,
        isFetching: isUserFetching,
        isError: isUserError,
        error: userError,
    } = useGetUserQuery({
        id: params?.id,
    });

    if (isUserError)
        return (
            <div className="text-center flex justify-center">
                {/* ///TODO 404 */}
                <h1 className="error">Error! {userError.status}</h1>
            </div>
        );
    if (isUserFetching) return <Loader />;

    return (
        <div className="my-3">
            <AvatarFullInfo user={user}></AvatarFullInfo>
            <div className="flex flex-col">
                <PostListContainer
                    itemsLimitPerPage={6}
                    fetchData={{
                        //fetchDataFunc: PostService.getPosts,
                        fetchDataArgs: { userId: [params?.id] },
                    }}
                ></PostListContainer>
            </div>
        </div>
    );
};

export default UserContainer;
