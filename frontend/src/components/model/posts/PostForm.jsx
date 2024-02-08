import React, { useState, useEffect, useMemo } from "react";
import CustomButton from "../../UI/button/CustomButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { isObjectEmpty } from "../../../helpers/helpers";
import AsyncSelect from "react-select/async";
import { nanoid } from "@reduxjs/toolkit";
import {
    useGetPostQuery,
    useAddPostMutation,
    useEditPostMutation,
} from "../../../redux/api/postsApi";
import { useGetPostCategoriesQuery } from "../../../redux/api/postCategoriesApi";
import { useSelector } from "react-redux/es/hooks/useSelector";

const bodyLimitValue = 500;
const schema = yup.object().shape({
    title: yup.string().required("Title is a required field"),
    body: yup
        .string()
        .max(
            bodyLimitValue,
            `Body must be at most ${bodyLimitValue} characters`
        ),
});

const PostForm = (props) => {
    //const { authUser } = useAuth();
    const { authUserId } = useSelector((state) => state.authData);

    // load the data only if a post is opened for editing
    const {
        data: loadedPostData = null,
        isSuccess: isLoadPostSuccess,
        isFetching: isPostFetching,
    } = useGetPostQuery(
        {
            id: props.selectedPost,
            _expand: ["postCategory"],
        },
        {
            skip: props.selectedPost ? false : true,
            refetchOnMountOrArgChange: true,
        }
    );

    const [addPost, { isLoading: isCreating }] = useAddPostMutation();
    const [editPost, { isLoading: isUpdating }] = useEditPostMutation();

    const {
        data: postsCategoriesLoadedData = [],
        isLoading: isPostCategoriesLoading,
        // isError: isPostCategoriesError,
        // error: postCategoriesError,
        refetch: getPostCategoriesQueryRefetch,
    } = useGetPostCategoriesQuery();

    const convertPostsCategoriesToOptions = (postsCategories) =>
        postsCategories.map((category) => ({
            value: category.id,
            label: category.name,
        }));

    const postsCategorySelectOptions = convertPostsCategoriesToOptions(
        postsCategoriesLoadedData
    );

    const getPostCategoryOptionById = (categoryId) => {
        return categoryId && postsCategorySelectOptions
            ? postsCategorySelectOptions.filter((x) => x.value === categoryId)
            : { value: "", label: "" };
    };

    const {
        control,
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        // defaultValues: useMemo(() => {
        //     if (loadedPostData)
        //         return {
        //             ...loadedPostData,
        //             // postCategoryId: loadedPostData.postCategory
        //             //     ? {
        //             //           value: loadedPostData.postCategory.id,
        //             //           label: loadedPostData.postCategory.name,
        //             //       }
        //             //     : { value: "", label: "" },
        //         };
        //     else {
        //         console.log("Empty obj");
        //         return {};
        //     }
        // }, [loadedPostData]),

        mode: "onSubmit",
        // reValidateMode: "onChange",
        resolver: yupResolver(schema),
        shouldFocusError: false,
    });

    useEffect(() => {
        if (isSubmitSuccessful) reset();
    }, [isSubmitSuccessful, reset]);

    useEffect(() => {
        reset(props.postDefaultValues);
    }, [props.postDefaultValues]);

    useEffect(() => {
        const defValues =
            loadedPostData && !isPostCategoriesLoading
                ? {
                      ...loadedPostData,
                      postCategoryId: getPostCategoryOptionById(
                          loadedPostData?.postCategoryId
                      ),

                      //     postCategoryId:loadedPostData.postCategory
                      // ? {
                      //       value: loadedPostData.postCategory.id,
                      //       label: loadedPostData.postCategory.name,
                      //   }
                      // : { value: "", label: "" },
                  }
                : {};
        console.log("Def values: ", defValues);

        reset(defValues);
    }, [loadedPostData, isPostCategoriesLoading, reset]); //getPostCategoryOptionById

    const bodyValue = watch("body");

    const savePost = (data) => {
        const newPost = {
            id: props.selectedPost, // if a post was opened for editing
            title: data.title,
            body: data.body,
            // if a post was opened for editing, do not change date of publication
            publicationDate: props.selectedPost
                ? data.publicationDate
                : new Date().toISOString(),
            userId: authUserId, //authUser?.id,
            postCategoryId: data.postCategoryId
                ? data.postCategoryId.value
                : postsCategoriesLoadedData.find(
                      (category) => category.isDefault
                  )?.id,
        };
        savePostToList(newPost);
    };

    const savePostToList = (newPost) => {
        if (newPost.id === undefined) {
            newPost.id = nanoid();
            addPost(newPost);
        } else {
            editPost(newPost);
        }
        //setSelectedPost({});
        props.setIsModalWindowOpen(false);
    };

    const closeForm = () => {
        reset();
        props.setIsModalWindowOpen(false);
    };

    //const getPostCategoriesSelectOptions = async () => {
    // const response = await PostCategoriesService.getAll();
    // return response?.data.map((category) => {
    //     return { value: category.id, label: category.name };
    // });
    //};

    //  Loading state render
    if (props.selectedPost && isPostFetching)
        return (
            <div className="flex justify-center">
                <span className="info">Loading...</span>
            </div>
        );
    if (props.selectedPost && !isLoadPostSuccess)
        return (
            <div className="flex justify-center">
                <span className="error">Loading error</span>
            </div>
        );
    if (isCreating)
        return (
            <div className="flex justify-center">
                <span className="info">Creating...</span>
            </div>
        );
    if (props.selectedPost && isUpdating)
        return (
            <div className="flex justify-center">
                <span className="info">Updating...</span>
            </div>
        );

    return (
        <form
            onSubmit={handleSubmit(savePost)}
            noValidate
            className="flex flex-col gap-y-5"
        >
            <div className="heading text-center text-2xl text-gray-800 uppercase">
                {isObjectEmpty(props.postDefaultValues)
                    ? "New post"
                    : "Edit post"}
            </div>

            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                <Controller
                    name="postCategoryId"
                    control={control}
                    render={({ field }) => (
                        <AsyncSelect
                            {...field}
                            isSearchable={false}
                            placeholder="Post category"
                            //defaultValue={{ value: "", label: "" }}
                            // defaultValue={() =>
                            //     getPostCategoryOptionById(
                            //         loadedPostData?.postCategoryId
                            //     )
                            // }
                            cacheOptions
                            defaultOptions={postsCategorySelectOptions}
                            loadOptions={getPostCategoriesQueryRefetch} //{getPostCategoriesSelectOptions}
                            //onChange={handleInputChange}
                        />
                    )}
                />

                <div className="relative z-0 w-full mt-6 group">
                    <textarea
                        {...register("title")}
                        type="text"
                        name="title"
                        id="title"
                        className="title w-full bg-gray-400 bg-opacity-10 text-sm sm:text-base border border-gray-300 p-2 outline-none peer"
                        spellCheck="false"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="title"
                        className="flex px-2 flex-row justify-between w-full peer-focus:text-xs peer-focus:font-medium absolute text-sm sm:text-base text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-8 top-2 -z-20 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8"
                    >
                        <span>Title </span>
                        <span className="inline-flex text-red-600 align-top justify-end">
                            {errors?.title?.message}
                        </span>
                    </label>
                </div>

                <div className="relative z-0 w-full mt-6 group">
                    <textarea
                        {...register("body")}
                        name="body"
                        id="body"
                        className="description w-full bg-gray-400 bg-opacity-10 sec p-2 h-60 text-sm sm:text-base border border-gray-300 outline-none peer"
                        spellCheck="false"
                        placeholder=" "
                    ></textarea>
                    <label
                        htmlFor="body"
                        className="flex px-2 flex-row justify-between w-full peer-focus:text-xs peer-focus:font-medium absolute text-sm sm:text-base text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-8  top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-8"
                    >
                        <span>Body </span>
                        <span className="inline-flex text-red-600 align-top justify-end">
                            {errors?.body?.message}
                        </span>
                    </label>
                </div>

                {/* icons */}
                <div className="icons flex text-gray-500 m-2">
                    <svg
                        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <svg
                        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <svg
                        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                    </svg>
                    <div
                        className={`${
                            String(bodyValue).length <= bodyLimitValue
                                ? "text-gray-400"
                                : "text-red-600"
                        }  count ml-auto text-xs font-semibold`}
                    >
                        {String(bodyValue).length}/{bodyLimitValue}
                    </div>
                </div>
                {/* buttons */}
                <div className="buttons flex justify-center gap-x-2">
                    <CustomButton
                        onClick={closeForm}
                        type="button"
                        className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 w-1/2 hover:bg-gray-200"
                    >
                        Cancel
                    </CustomButton>
                    <CustomButton
                        type="submit"
                        className="btn bg-gray-200 border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 w-1/2 hover:bg-gray-300"
                    >
                        Save
                    </CustomButton>
                </div>
            </div>
        </form>
    );
};

export default PostForm;
