import React from "react";
import AnonymousAvatarShortInfo from "../users/AnonymousAvatarShortInfo";

function CommentListItem({ comment }) {
    return (
        <div className="flex flex-col gap-x-10 justify-start border-[1px] border-gray-300 p-4 bg-white sm:w-full text-sm sm:text-base rounded">
            <div>
                <AnonymousAvatarShortInfo
                    personEmail={comment.email}
                ></AnonymousAvatarShortInfo>
            </div>
            <div className="mt-2 flex flex-col gap-y-2">
                <div className="font-semibold">{comment.name}</div>
                <div className="text-gray-600">{comment.body}</div>
            </div>
        </div>
    );
}

export default CommentListItem;
