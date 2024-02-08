import React, { Suspense } from "react";
import PostListItem from "./PostListItem";
//import { CSSTransition, TransitionGroup } from "react-transition-group";
import classes from "./PostList.module.css";
//import { BsFillBagFill } from "react-icons/bs";
//import Skeleton from "react-loading-skeleton";

const PostList = ({
    posts,
    postsTotalCount,
    title,
    isPostsLoading,
    setSelectedPost,
    setIsModalWindowOpen,
}) => {
    const handlechange = (post) => {
        setSelectedPost(post.id);
    };

    if (postsTotalCount === 0)
        return <h1 className="text-center m-1">No posts found!</h1>;

    return (
        <div id="postListSection" className={classes.postList}>
            {/* <TransitionGroup className={classes.postList}> */}
            {posts &&
                posts.map((post, index) => (
                    // <div style={{ display: "flex" }}>
                    // <Skeleton containerClassName="flex-1" count={5}/>
                    //  <Skeleton
                    //  containerClassName="flex-1"
                    //    circle
                    //    height="100%"
                    //    style={{backgroundColor:'red'}}
                    //  />
                    // </div>

                    //   <CSSTransition key={post.id} timeout={1000} classNames="item">
                    <PostListItem
                        key={post.id} // - is not needed here because it's used in <CSSTransition>
                        //number={index + 1}
                        post={post}
                        handlechange={handlechange}
                        setIsModalWindowOpen={setIsModalWindowOpen}
                    ></PostListItem>
                    //   </CSSTransition>
                ))}
            {/* </TransitionGroup> */}
        </div>
    );
};

export default PostList;
