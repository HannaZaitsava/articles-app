import React from "react";
import CommentListItem from "./CommentListItem";

function CommentList({
    comments,
    commentsTotalCount,
    title,
    isCommentsLoading,
    setSelectedComment,
    setIsModalWindowOpen,
}) {
    const handlechange = (comment) => {
        setSelectedComment(comment.id);
    };

    return (
        <div
            id="commentListSection"
            className="flex flex-col w-full items-stretch max-sm:border-t border-gray-500"
        >
            <h2 className="text-center font-bold bg-gray-100 py-2">{title}</h2>

            {commentsTotalCount === 0 ? (
                <h1 className="text-center m-1">No comments created yet!</h1>
            ) : (
                <div className="flex flex-col items-stretch gap-y-4">
                    {comments &&
                        comments.map((comment) => (
                            <div key={comment.id}>
                                <CommentListItem
                                    comment={comment}
                                    handlechange={handlechange}
                                    setIsModalWindowOpen={setIsModalWindowOpen}
                                ></CommentListItem>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default CommentList;
