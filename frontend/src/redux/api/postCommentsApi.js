import { api } from "./api";
import { providesTagList, transformResponseForPagination } from './apiHelpers';
import { POST_COMMENTS } from './apiConsts';

export const postCommentsApi = api.injectEndpoints({
    reducerPath: "postCommentsApi",
    tagTypes: ["PostComment"],
    endpoints: (build) => ({
        getPostComments: build.query({
            query: (params) => ({
                url: POST_COMMENTS,
                params: { ...params },
            }),
            providesTags: (result, error, arg) => providesTagList(result?.apiResponse, "PostComment"),
            transformResponse: (apiResponse, meta, arg) => transformResponseForPagination(apiResponse, meta, arg),
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
            },
        }),
        getPostComment: build.query({
            query: ({id, ...rest}) => ({
                url: `${POST_COMMENTS}/${id}`,
                params:  rest ,
            }),
            providesTags: (result, error, arg) => [{ type: "PostComment", id: arg }],
        }),
        addPostComment: build.mutation({
            query: (postComment) => ({
                url: POST_COMMENTS,
                method: "POST",
                body: postComment,
            }),
            invalidatesTags: [{ type: "PostComment", id: "LIST" }],
        }),
        editPostComment: build.mutation({
            query: (postComment) => {
                const { id, ...rest } = postComment;
                return {
                    url: `${POST_COMMENTS}/${postComment.id}`,
                    method: "PATCH",
                    body: rest,
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: "PostComment", id: arg.id },
            ],
        }),
        deletePostComment: build.mutation({
            query: (id) => ({
                url: `${POST_COMMENTS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, err, arg) => [
                { type: "PostComment", id: arg },
                { type: "PostComment", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetPostCommentsQuery,
    useGetPostCommentQuery,
    useAddPostCommentMutation,
    useEditPostCommentMutation,
    useDeletePostCommentMutation,
} = postCommentsApi;
