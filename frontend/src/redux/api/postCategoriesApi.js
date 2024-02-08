import { api } from "./api";
import { POST_CATEGORIES } from "./apiConsts";
import { providesTagList } from './apiHelpers';

export const postCategoriesApi = api.injectEndpoints({
    reducerPath: "postCategoriesApi",
    tagTypes: ["PostCategory"],
    endpoints: (build) => ({
        getPostCategories: build.query({
            query: () => POST_CATEGORIES,
            providesTags: (result, error, arg) => providesTagList(result?.apiResponse, "PostCategory"),
        }),
        getPostCategory: build.query({
            query: ({id, ...rest}) => ({
                url: `${POST_CATEGORIES}/${id}`,
                params:  rest ,
            }),
            providesTags: (result, error, arg) => [{ type: "PostCategory", id: arg }],
        }),
        addPostCategory: build.mutation({
            query: (postCategory) => ({
                url: POST_CATEGORIES,
                method: "POST",
                body: postCategory,
            }),
            invalidatesTags: [{ type: "PostCategory", id: "LIST" }],
        }),
        editPostCategory: build.mutation({
            query: (postCategory) => {
                const { id, ...rest } = postCategory;
                return {
                    url: `${POST_CATEGORIES}/${postCategory.id}`,
                    method: "PATCH",
                    body: rest,
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: "PostCategory", id: arg.id },
            ],
        }),
        deletePostCategory: build.mutation({
            query: (id) => ({
                url: `${POST_CATEGORIES}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, err, arg) => [
                { type: "PostCategory", id: arg },
                { type: "PostCategory", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetPostCategoriesQuery,
    useGetPostCategoryQuery,
    useAddPostCategoryMutation,
    useEditPostCategoryMutation,
    useDeletePostCategoryMutation,
} = postCategoriesApi;
