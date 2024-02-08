import React, { useState } from "react";
import { useGetPostCommentsQuery } from "../../../redux/api/postCommentsApi";
import Loader from "./../../UI/loader/Loader";
import LoadMorePagination from "./../../UI/pagination/LoadMorePagination";
import PaginationProgressBar from "./../../UI/pagination/PaginationProgressBar";
import CommentList from "./CommentList";

function CommentsListContainer(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const [commentsLimit, setCommentsLimit] = useState(props.itemsLimitPerPage); // post limit per page
    const [selectedComment, setSelectedComment] = useState({});

    const commentsQueryParams = {
        ...props.fetchData.fetchDataArgs,
        _expand: [],
        _page: pageNumber,
        _limit: commentsLimit,
    };

    const {
        comments,
        commentsTotalCount,
        pagesTotalCount,
        paginatedElementsCount,
        isCommentsLoading,
        isCommentsFetching,
        isCommentsError,
        commentsError,
    } = useGetPostCommentsQuery(commentsQueryParams, {
        selectFromResult: ({
            data,
            isLoading,
            isFetching,
            isError,
            error,
        }) => ({
            comments: data?.apiResponse,
            commentsTotalCount: data?.dataTotalCount,
            pagesTotalCount: data?.pagesTotalCount,
            //fetchedCommentsCount: data?.apiResponse.length,
            paginatedElementsCount: data?.fetchedDataTotalCount,
            isCommentsLoading: isLoading,
            isCommentsFetching: isFetching,
            isCommentsError: isError,
            commentsError: error,
        }),
    });

    const changePage = (pageNumber) => {
        setPageNumber(pageNumber);
    };

    if (isCommentsError)
        return (
            <div className="flex justify-center text-red-600">
                {/* <h1 className="error">Error! Comments cannot be loaded.</h1> */}
                <h1 className="error">Error! {commentsError.status}</h1>
            </div>
        );

    // if (isCommentsFetching && !comments) return <Skeleton />;

    return (
        <div className="flex flex-col justify-start h-full w-full">
            <div className="flex justify-center">
                <CommentList
                    comments={comments}
                    commentsTotalCount={commentsTotalCount}
                    dataIsFetching={isCommentsFetching}
                    isCommentsLoading={isCommentsLoading}
                    setSelectedComment={setSelectedComment}
                    title="Recent comments:"
                ></CommentList>
            </div>

            {isCommentsLoading && <Loader />}

            <div
                id="paginationContainer"
                className="relative flex flex-col items-center my-4 mx-auto w-full sm:w-4/5"
            >
                <LoadMorePagination
                    page={pageNumber}
                    changePage={changePage}
                    totalPages={pagesTotalCount}
                    isLoading={isCommentsFetching}
                ></LoadMorePagination>
                <PaginationProgressBar
                    page={pageNumber}
                    totalPages={pagesTotalCount}
                    fetchedElementsCount={paginatedElementsCount}
                    elementsTotalCount={commentsTotalCount}
                    isLoading={isCommentsFetching}
                    elementNamePlural="comments"
                    showItemsCount={true}
                    showPagesCount={false}
                    showPercentage={false}
                ></PaginationProgressBar>
            </div>
        </div>
    );
}

export default CommentsListContainer;
