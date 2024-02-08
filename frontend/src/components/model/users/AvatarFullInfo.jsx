import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const AvatarFullInfo = ({ user }) => {
    return (
        <div className="w-full h-full">
            <Link to={`/users/${user.id}`}>
                <div className="flex flex-row justify-center items-center gap-x-4 group p-2 rounded border-2 border-gray-300 bg-gray-200 hover:bg-gray-100">
                    <div className="flex h-24 w-24 rounded-full bg-gray-50 items-center justify-center overflow-hidden group-hover:border-gray-300 border-gray-400 border-[1px] group-hover:border-2">
                        {user.avatarImg ? (
                            <img src={user.avatarImg} alt="User avatar" />
                        ) : (
                            <UserIcon
                                strokeWidth={1}
                                className="h-full w-full"
                            ></UserIcon>
                        )}
                    </div>

                    <div className="text-sm sm:text-base leading-6">
                        <p className="font-semibold text-gray-900">
                            <span className=" inset-0" />
                            {user.username}
                        </p>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AvatarFullInfo;
