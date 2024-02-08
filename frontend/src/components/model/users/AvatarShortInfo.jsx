import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const AvatarShortInfo = ({ user }) => {
    return (
        <div>
            {user && (
                <Link to={`/users/${user.id}`}>
                    <div className="flex flex-row items-center gap-x-4 group">
                        <div className="flex h-10 w-10 rounded-full bg-gray-50 items-center justify-center overflow-hidden group-hover:border-gray-200 group-hover:border-2">
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
            )}
        </div>
    );
};

export default AvatarShortInfo;
