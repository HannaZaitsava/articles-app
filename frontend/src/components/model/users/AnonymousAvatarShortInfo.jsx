import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";

const AnonymousAvatarShortInfo = ({ personEmail }) => {
    return (
        <div>
            <div className="flex flex-row items-center gap-x-4 group">
                <div className="flex h-10 w-10 rounded-full bg-gray-50 items-center justify-center overflow-hidden group-hover:border-gray-200 group-hover:border-2">
                    <UserIcon className="h-6 w-6"></UserIcon>
                </div>

                <div className="text-sm sm:text-base leading-6">
                    <p className="text-gray-600">{personEmail}</p>
                </div>
            </div>
        </div>
    );
};

export default AnonymousAvatarShortInfo;
