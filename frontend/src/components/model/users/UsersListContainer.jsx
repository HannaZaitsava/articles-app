import { React, useEffect, useState } from "react";
//import UserFilter from "./UserFilter";
import UsersFilterContainer from "./UsersFilterContainer";
import UserList from "./UserList";
import Loader from "./../../UI/loader/Loader";
import LoadMorePagination from "./../../UI/pagination/LoadMorePagination";
import { useGetUsersQuery } from "../../../redux/api/usersApi";
import { usersSortingOptions } from "./../../consts/sorting/usersSortingOptions";
import SimplePagination from "./../../UI/pagination/SimplePagination";
//import Skeleton from "react-loading-skeleton";
//import { Skeleton } from './Skeleton'
import usePreviousValue from "./../../../hooks/usePreviousValue";
import PaginationProgressBar from "./../../UI/pagination/PaginationProgressBar";

const UsersListContainer = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [usersLimit, setUsersLimit] = useState(props.itemsLimitPerPage); // post limit per page
    const [selectedUser, setSelectedUser] = useState({});

    const [filter, setFilter] = useState({
        sort: usersSortingOptions[0].value.sortField,
        sortOrder: usersSortingOptions[0].value.order,
        searchQuery: "",
        selectedFilters: {
            //postCategoryId: [],
            //userId: [],
        },
    });

    const usersQueryParams = {
        ...props.fetchData.fetchDataArgs,
        ...filter?.selectedFilters,
        _expand: [],
        q: filter?.searchQuery, // Full-text search
        _sort: filter?.sort,
        _order: filter?.sortOrder === 1 ? "asc" : "desc",
        _page: pageNumber,
        _limit: usersLimit,
    };

    const {
        users,
        usersTotalCount,
        pagesTotalCount,
        paginatedElementsCount,
        isUsersLoading,
        isUsersFetching,
        isUsersError,
        usersError,
    } = useGetUsersQuery(
        usersQueryParams,
        //     {
        //     //skip: props.selectedPost ? false : true,
        //     refetchOnMountOrArgChange: true,
        // },
        {
            //refetchOnMountOrArgChange: true,
            selectFromResult: ({
                data,
                isLoading,
                isFetching,
                isError,
                error,
            }) => ({
                users: data?.apiResponse,
                usersTotalCount: data?.dataTotalCount,
                pagesTotalCount: data?.pagesTotalCount,
                //fetchedUsersCount: data?.apiResponse.length,
                paginatedElementsCount: data?.fetchedDataTotalCount,
                isUsersLoading: isLoading,
                isUsersFetching: isFetching,
                isUsersError: isError,
                usersError: error,
            }),
        }
    );

   //const previousPageValue = usePreviousValue(pageNumber);

    // useEffect(() => {
    //     // const abortController = new AbortController();

    //     // only filters changed, page is still the same
    //     if (previousPageValue === pageNumber) {
    //         if (pageNumber !== 1) setPageNumber(1);
    //         //getUsersQueryRefetch();
    //     }

    //     // return () => {
    //     //     abortController.abort();
    //     // };
    // }, [
    //     pageNumber,
    //     usersLimit,
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

    if (isUsersError)
        return (
            <div className="flex justify-center text-red-600">
                {/* <h1 className="error">Error! Posts cannot be loaded.</h1> */}
                <h1 className="error">Error! {usersError.status}</h1>
            </div>
        );

    // if (isUsersFetching && !users) return <Skeleton />;

    return (
        <div className="flex flex-col justify-start h-full w-full">
            {/* <UserFilter filter={filter} setFilter={setFilter} /> */}
            {/* <UsersFilterContainer filter={filter} setFilter={setFilter} /> */}
            <UsersFilterContainer filter={filter} setFilter={changeFilter} />

            <div className="flex justify-center">
                <UserList
                    users={users}
                    usersTotalCount={usersTotalCount}
                    dataIsFetching={isUsersFetching}
                    isUsersLoading={isUsersLoading}
                    setSelectedUser={setSelectedUser}
                ></UserList>
            </div>

            {isUsersLoading && <Loader />}

            <div
                id="paginationContainer"
                className="flex flex-col items-center my-4 mx-auto w-full sm:w-1/4"
            >
                {/* <SimplePagination
                    page={pageNumber}
                    changePage={changePage}
                    totalPages={pagesTotalCount}
                ></SimplePagination> */}

                <LoadMorePagination
                    // elementNamePlural="users"
                    // fetchedElementsCount={paginatedElementsCount}
                    // elementsTotalCount={usersTotalCount}
                    page={pageNumber}
                    changePage={changePage}
                    totalPages={pagesTotalCount}
                    isLoading={isUsersLoading}
                ></LoadMorePagination>
                <PaginationProgressBar
                    page={pageNumber}
                    totalPages={pagesTotalCount}
                    fetchedElementsCount={paginatedElementsCount}
                    elementsTotalCount={usersTotalCount}
                    isLoading={isUsersFetching}
                    elementNamePlural="users"
                    showItemsCount={true}
                    showPagesCount={false}
                    showPercentage={false}
                ></PaginationProgressBar>
            </div>
        </div>
    );
};

export default UsersListContainer;
