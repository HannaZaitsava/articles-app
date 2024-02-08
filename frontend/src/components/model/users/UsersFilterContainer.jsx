import React from "react";
import SearchInputDebounced from "../../UI/input/SearchInputDebounced";
import Select from "react-select";
import { usersSortingOptions } from "../../consts/sorting/usersSortingOptions";

function UsersFilterContainer({ filter, setFilter }) {
    const onSearchTextChangedHandler = (searchString) => {
        setFilter({ ...filter, searchQuery: searchString?.trim() });
    };

    const onSortSelectOptionChangedHandler = (selectedOption) => {
        setFilter({
            ...filter,
            sort: selectedOption
                ? selectedOption.value.sortField
                : usersSortingOptions[1].value.sortField,
            sortOrder: selectedOption
                ? selectedOption.value.order
                : usersSortingOptions[1].value.order,
        });
    };

    return (
        <div
            id="filtersContainer"
            className="flex flex-col w-full justify-between gap-y-2 md:gapy-4 py-2 md:py-4 bg-white"
        >
            <SearchInputDebounced
                placeholder="Search..."
                value={filter.searchQuery}
                onSearchTextChangedHandler={onSearchTextChangedHandler}
            ></SearchInputDebounced>

            <div className="w-full lg:max-w-none flex flex-col items-center lg:flex-row lg:justify-between gap-x-8 gap-y-2 md:gapy-4 mx-auto lg:mx-0">
                <div className="w-full h-full">
                    <Select
                        //defaultValue={usersSortingOptions[1]}
                        isClearable
                        onChange={onSortSelectOptionChangedHandler}
                        isSearchable={false}
                        placeholder="Sort by:"
                        options={usersSortingOptions}
                    />
                </div>
            </div>
        </div>
    );
}

export default UsersFilterContainer;
