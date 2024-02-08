import React, { Suspense, useEffect, useState } from "react";
import { useQueryParams } from "use-query-params";

import PostFilterContainer from "./PostFilterContainer";
import PostForm from "./PostForm";
import Loader from "../../UI/loader/Loader";
//import ModalWindow from './../../UI/modalWindow/ModalWindow';
import PortalModalWindow from "../../UI/modalWindow/PortalModalWindow";
import LoadMorePagination from "../../UI/pagination/LoadMorePagination";
import { postsSortingOptions } from "../../consts/sorting/postsSortingOptions";
import { useGetPostsQuery } from "../../../redux/api/postsApi";
import SimplePagination from "./../../UI/pagination/SimplePagination";
import PostList from "./PostList";
import usePreviousValue from "./../../../hooks/usePreviousValue";
import PaginationProgressBar from "./../../UI/pagination/PaginationProgressBar";

function PostListContainer(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const [postsLimit, setPostsLimit] = useState(props.itemsLimitPerPage); //post limit per page
    const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});

    const [filter, setFilter] = useState({
        sort: postsSortingOptions[1].value.sortField,
        sortOrder: postsSortingOptions[1].value.order,
        searchQuery: "",
        selectedFilters: {
            postCategoryId: [],
            //userId: [],
        },
    });

    const postsQueryParams = {
        ...props.fetchData.fetchDataArgs,
        ...filter?.selectedFilters,
        _expand: ["user", "postCategory"],
        q: filter?.searchQuery, // Full-text search
        _sort: filter?.sort,
        _order: filter?.sortOrder === 1 ? "asc" : "desc",
        _page: pageNumber,
        _limit: postsLimit,
    };

    const {
        posts,
        postsTotalCount,
        pagesTotalCount,
        paginatedElementsCount,
        isPostsLoading,
        isPostsFetching,
        isPostsError,
        postsError,
    } = useGetPostsQuery(postsQueryParams, {
        selectFromResult: ({
            data,
            isLoading,
            isFetching,
            isError,
            error,
        }) => ({
            posts: data?.apiResponse,
            postsTotalCount: data?.dataTotalCount,
            pagesTotalCount: data?.pagesTotalCount,
            //fetchedPostsCount: data?.apiResponse.length,
            paginatedElementsCount: data?.fetchedDataTotalCount,
            isPostsLoading: isLoading,
            isPostsFetching: isFetching,
            isPostsError: isError,
            postsError: error,
        }),
    });

    // const previousPageValue = usePreviousValue(pageNumber);

    // useEffect(() => {
    //     //const abortController = new AbortController();

    //     //let postsResponse = [];
    //     //let concatPostsFetching = false;

    //     // only filters changed, page is still the same
    //     if (previousPageValue === pageNumber) {
    //         if (pageNumber !== 1) setPageNumber(1);
    //     }

    //     // return () => {
    //     //     abortController.abort();
    //     // };
    // }, [
    //     pageNumber,
    //     postsLimit,
    //     filter.sort,
    //     filter.sortOrder,
    //     filter.searchQuery,
    //     filter.selectedFilters,
    //     //previousPageValue - causes the infinite loop
    // ]);

    const changeFilter = (filterData) => {
        setFilter(filterData);
        setPageNumber(1);
    };

    const changePage = (pageNumber) => {
        setPageNumber(pageNumber);
    };

    if (isPostsError)
        return (
            <div className="flex justify-center text-red-600">
                {/* <h1 className="error">Error! Posts cannot be loaded.</h1> */}
                <h1 className="error">Error! {postsError.status}</h1>
            </div>
        );

    return (
        <div id="postListContainer">
            <PortalModalWindow
                isOpen={isModalWindowOpen}
                setIsModalWindowOpen={setIsModalWindowOpen}
                domNodeContainer={document.body}
            >
                <PostForm
                    setIsModalWindowOpen={setIsModalWindowOpen}
                    selectedPost={selectedPost}
                ></PostForm>
            </PortalModalWindow>

            <div className="flex flex-col justify-start">
                {/* <PostFilterContainer filter={filter} setFilter={setFilter} /> */}
                <PostFilterContainer filter={filter} setFilter={changeFilter} />

                {isPostsLoading ? (
                    <Loader />
                ) : (
                    <PostList
                        isPostsLoading={isPostsLoading}
                        posts={posts}
                        postsTotalCount={postsTotalCount}
                        setIsModalWindowOpen={() => setIsModalWindowOpen(true)}
                        setSelectedPost={setSelectedPost}
                    ></PostList>
                )}

                <div
                    id="paginationContainer"
                    className="flex flex-col items-center my-4 mx-auto w-full sm:w-1/4"
                >
                    <SimplePagination
                        page={pageNumber}
                        changePage={changePage}
                        totalPages={pagesTotalCount}
                    ></SimplePagination>
                    {/* <LoadMorePagination
                        // elementNamePlural="posts"
                        // fetchedElementsCount={paginatedElementsCount}
                        // elementsTotalCount={usersTotalCount}
                        page={pageNumber}
                        changePage={changePage}
                        totalPages={pagesTotalCount}
                        isLoading={isPostsFetching}
                    ></LoadMorePagination> */}
                    <PaginationProgressBar
                        page={pageNumber}
                        totalPages={pagesTotalCount}
                        fetchedElementsCount={paginatedElementsCount}
                        elementsTotalCount={postsTotalCount}
                        isLoading={isPostsFetching}
                        elementNamePlural="posts"
                        showItemsCount={true}
                        showPagesCount={false}
                        showPercentage={false}
                    ></PaginationProgressBar>
                </div>
            </div>
        </div>
    );
}

export default PostListContainer;
