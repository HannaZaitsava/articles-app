import { api } from "./api";
import { POSTS } from "./apiConsts";
import {
    providesTagList,
    transformResponseForPagination,
} from "./apiHelpers";

export const postsApi = api.injectEndpoints({
    reducerPath: "postsApi",
    tagTypes: ["Post"],
    endpoints: (build) => ({
        getPosts: build.query({
            query: (params) => ({
                url: POSTS,
                params: { ...params },
            }),
            providesTags: (result, error, arg) => providesTagList(result?.apiResponse, "Post"),

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
            // serializeQueryArgs: ({ endpointName }) => {
            //     return endpointName;
            // },
            // // Always merge incoming data to the cache entry
            // merge: (currentCache, newItems, otherArgs) => {
            //     //currentCache.apiResponse.push(...newItems.apiResponse);
            //    // if (currentCache?.apiResponse) {
            //     if(otherArgs?.arg._page !== 1 && currentCache?.apiResponse) {
            //         const res = {
            //             ...currentCache,
            //             ...newItems,
            //             apiResponse: [
            //                 ...currentCache.apiResponse,
            //                 ...newItems.apiResponse,
            //             ],
            //         };
            //         return res;
            //     }
            //     return newItems;
            // },
            // // Refetch when the page arg changes
            // forceRefetch({ currentArg, previousArg }) {
            //     return currentArg !== previousArg;
            //     // if (
            //     //     currentArg &&
            //     //     currentArg._page &&
            //     //     previousArg &&
            //     //     previousArg._page
            //     // )
            //     //     return currentArg?._page > previousArg?._page;
            //     // return false;
            // },
        }),
        getPost: build.query({
            query: ({ id, ...rest }) => ({
                url: `${POSTS}/${id}`,
                params: rest,
            }),
            providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
        }),
        addPost: build.mutation({
            query: (post) => ({
                url: POSTS,
                method: "POST",
                body: post,
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
        editPost: build.mutation({
            query: (post) => {
                const { id, ...rest } = post;
                return {
                    url: `${POSTS}/${post.id}`,
                    method: "PATCH",
                    body: rest,
                };
            },
            invalidatesTags: (res, err, arg) => [
                { type: "Post", id: arg.id },
                { type: "Post", id: "LIST" },
            ],
        }),
        deletePost: build.mutation({
            query: (id) => ({
                url: `${POSTS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, err, arg) => [
                { type: "Post", id: arg },
                { type: "Post", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddPostMutation,
    useEditPostMutation,
    useDeletePostMutation,
} = postsApi;
