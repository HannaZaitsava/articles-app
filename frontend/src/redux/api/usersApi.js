import { api } from "./api";
import {
    providesTagList,
    transformResponseForPagination,
} from "./apiHelpers";
import { USERS } from "./apiConsts";

export const usersApi = api.injectEndpoints({
    reducerPath: "usersApi",
    tagTypes: ["User"],
    endpoints: (build) => ({
        getUsers: build.query({
            query: (params) => ({
                url: USERS,
                params: { ...params },
            }),
            providesTags: (result, error, arg) =>
                providesTagList(result?.apiResponse, "User"),
            transformResponse: (apiResponse, meta, arg) => transformResponseForPagination(apiResponse, meta, arg),

            //TODO: unfinished "Load more" pagination. Can't refetch data after mutation because of possibly incorrect Tags.
            // Is it OK to merge responses in cache? Will it lead to running out of memory?
            // Try useLazyQuery or react-virtual
            //
            //serializeQueryArgs: ({ queryArgs }) => {
            //     const newQueryArgs = { ...queryArgs };
            //     if (newQueryArgs._page) {
            //         delete newQueryArgs._page;
            //     }
            //     return newQueryArgs;
            // },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems, otherArgs) => {
                //currentCache.apiResponse.push(...newItems.apiResponse);
                if(otherArgs?.arg._page !== 1 && currentCache?.apiResponse) {
                // if (currentCache?.apiResponse) {
                    const res = {
                        ...currentCache,
                        ...newItems,
                        apiResponse: [
                            ...currentCache.apiResponse,
                            ...newItems.apiResponse,
                        ],
                    };
                    return res;
                }
                return newItems;
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
                // if (
                //     currentArg &&
                //     currentArg._page &&
                //     previousArg &&
                //     previousArg._page
                // )
                //     return currentArg?._page > previousArg?._page;
                // return false;
            },
        }),
        getUser: build.query({
            query: ({ id, ...rest }) => ({
                url: `${USERS}/${id}`,
                params: rest,
            }),
            providesTags: (result, error, arg) => [{ type: "User", id: arg }],
        }),
        addUser: build.mutation({
            query: (user) => ({
                url: USERS,
                method: "POST",
                body: user,
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        editUser: build.mutation({
            query: (user) => {
                const { id, ...rest } = user;
                return {
                    url: `${USERS}/${user.id}`,
                    method: "PATCH",
                    body: rest,
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `${USERS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, err, arg) => [
                { type: "User", id: arg },
                { type: "User", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddUserMutation,
    useEditUserMutation,
    useDeleteUserMutation,
} = usersApi;
