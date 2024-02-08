import React from "react";
//import SearchInput from "../../UI/input/SearchInput";
import SearchInputDebounced from "../../UI/input/SearchInputDebounced";
import Select from "react-select";
import FilterAsyncSelect from "../../UI/select/FilterAsyncSelect";
import { postsSortingOptions } from "../../consts/sorting/postsSortingOptions";
import { useGetPostCategoriesQuery } from "../../../redux/api/postCategoriesApi";

function PostFilterContainer({ filter, setFilter }) {
    const onSearchTextChangedHandler = (searchString) => {
        setFilter({ ...filter, searchQuery: searchString?.trim() });
    };

    const {
        data: postsCategoriesLoadedData = [],
        isLoading: isPostCategoriesLoading,
        isError: isPostCategoriesError,
        error: postCategoriesError,
        refetch: getPostCategoriesQueryRefetch,
    } = useGetPostCategoriesQuery();

    // // handler for CustomSelect
    //   const onCustomSelectOptionChangedHandler = (selectedOption) => {
    //     setFilter({
    //       ...filter,
    //       sort: selectedOption.sortField,
    //       sortOrder: selectedOption.order,
    //     });
    //   };

    const onSortSelectOptionChangedHandler = (selectedOption) => {
        setFilter({
            ...filter,
            sort: selectedOption
                ? selectedOption.value.sortField
                : postsSortingOptions[1].value.sortField,
            sortOrder: selectedOption
                ? selectedOption.value.order
                : postsSortingOptions[1].value.order,
        });
    };
    const onFilterSelectOptionChangedHandler = (selectedOption) => {
        setFilter({
            ...filter,
            selectedFilters: {
                ...filter.selectedFilters,
                postCategoryId: selectedOption.map((option) => option.value),
            },
        });
    };

    // const getPostCategoriesFilterSelectOptions = async () => {
    //     const response = await PostCategoriesService.getAll();
    //     return response?.data.map((category) => {
    //         return { value: category.id, label: category.name };
    //     });
    // };

    const convertPostsCategoriesToOptions = (postsCategories) =>
        postsCategories.map((category) => ({
            value: category.id,
            label: category.name,
        }));

    const postsCategorySelectOptions = convertPostsCategoriesToOptions(
        postsCategoriesLoadedData
    );

    return (
        <div
            id="filtersContainer"
            className="flex flex-col w-full justify-between gap-y-2 md:gapy-4 py-2 md:py-4 bg-white"
        >
            {/* Usual search input */}
            {/* <SearchInput
                        placeholder="Search..."
                        defaultValue={filter.searchQuery}
                        onChange={(e) => onSearchTextChangedHandler(e.target.value)}
                        ></SearchInput> */}

            {/* Debounced search input */}
            <SearchInputDebounced
                placeholder="Search..."
                value={filter.searchQuery}
                onSearchTextChangedHandler={onSearchTextChangedHandler}
            ></SearchInputDebounced>

            <div className="w-full lg:max-w-none flex flex-col items-center lg:flex-row lg:justify-between gap-x-8 gap-y-2 md:gapy-4 mx-auto lg:mx-0">
                <div className="w-full lg:w-2/3 h-full ">
                    <FilterAsyncSelect
                        placeholder="Filter by category:"
                        defaultOptions={postsCategorySelectOptions}
                        //getOptionsFunc={getPostCategoriesFilterSelectOptions}
                        loadOptions={getPostCategoriesQueryRefetch}
                        handleInputChange={onFilterSelectOptionChangedHandler}
                    ></FilterAsyncSelect>
                </div>

                <div className="w-full lg:w-1/3 h-full ">
                    <Select
                        //defaultValue={postsSortingOptions[1]}
                        isClearable
                        onChange={onSortSelectOptionChangedHandler}
                        isSearchable={false}
                        placeholder="Sort by:"
                        options={postsSortingOptions}
                    />
                    {/* <CustomSelect
                        value={{ sortField: filter.sort, order: filter.sortOrder }}
                        onChange={onCustomSelectOptionChangedHandler}
                        options={postSortingOptions}
                    ></CustomSelect> */}
                </div>
            </div>
        </div>
    );
}

export default PostFilterContainer;
