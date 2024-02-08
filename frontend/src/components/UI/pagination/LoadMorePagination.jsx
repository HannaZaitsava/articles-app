import React from "react";
import CustomButton from "./../button/CustomButton";

function LoadMorePagination({ totalPages, page, changePage, isLoading }) {
    const visibility = page === totalPages ? "hidden" : "visible";
    return (
        <CustomButton
            className={`lex flex-row justify-center items-stretch w-full mx-auto my-2 py-2.5 bg-white hover:bg-gray-100
        border border-gray-300 rounded hover:border-gray-700 ${visibility}
            `}
            onClick={() => changePage(page + 1)}
        >
            {isLoading ? "Loading..." : "Load More"}
        </CustomButton>
    );
}

export default LoadMorePagination;
