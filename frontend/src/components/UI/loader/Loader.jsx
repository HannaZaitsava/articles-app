import React from "react";

function Loader(props) {
    return (
        <div className="flex justify-center">
            <div className="w-5 h-5 md:w-10 md:h-10 m-4 md:m-10 text-center rounded-[50%] border-[3px] md:border-[4px] border-dashed border-gray-700 animate-spin ring-offset-neutral-800"></div>
        </div>
    );
}

export default Loader;
