import React from "react";
import PostListContainer from "../components/model/posts/PostListContainer";

function PostsPage() {
    return (
        <PostListContainer
            itemsLimitPerPage={6}
            fetchData={{
                fetchDataArgs: {},
                concatPostsWhenPaginating: false,
            }}
        ></PostListContainer>
    );
}

export default PostsPage;
