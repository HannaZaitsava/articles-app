import React from "react";
import CustomSelect from "../../UI/select/CustomSelect";
import SearchInput from "./../../UI/input/SearchInput";
import Select from "react-select";
import SearchInputDebounced from './../../UI/input/SearchInputDebounced';

const sortingOptions = [
  {
    key: "userName",
    value: { sortField: "username", order: 1 },
    label: "By user name",
  },
  {
    key: "userNameDesc",
    value: { sortField: "username", order: -1 },
    label: "By user name - Desc",
  },
];

function UserFilter({ filter, setFilter }) {
  const onSearchTextChangedHandler = (searchString) => {
    setFilter({ ...filter, searchQuery: searchString?.trim() });
  };

   // // handler for CustomSelect
//    const onCustomSelectOptionChangedHandler = (selectedOption) => {
//     setFilter({
//       ...filter,
//       sort: selectedOption.sortField,
//       sortOrder: selectedOption.order,
//     });
//   };

  const onSelectOptionChangedHandler = (selectedOption) => {
    setFilter({
      ...filter,
      sort: selectedOption.value.sortField,
      sortOrder: selectedOption.value.order,
    });
  };


  return (
    <div
      className="w-full lg:max-w-none flex flex-col items-center lg:flex-row lg:justify-between gap-x-8 py-2 md:py-4 mx-auto lg:mx-0 bg-white"
    >
      <div className="w-full lg:w-2/3 h-full max-lg:my-1">
        {/* <SearchInput
          placeholder="Simple Search..."
          defaultValue={filter.searchQuery}
          onChange={(e) => onSearchTextChangedHandler(e.target.value)}
        ></SearchInput> */}

          {/* Debounced search input */}
          <SearchInputDebounced
            placeholder="Search..."
            value={filter.searchQuery}
            onSearchTextChangedHandler={onSearchTextChangedHandler}
          ></SearchInputDebounced>
      </div>

      <div className="w-full lg:w-1/3 h-full max-lg:my-1">
        <Select
          //defaultValue={{ sortField: filter.sort, order: filter.sortOrder }}
          onChange={onSelectOptionChangedHandler}
          isSearchable={false}
          placeholder="Sort by:"
          options={sortingOptions}
        />
        {/* <CustomSelect
          value={{ sortField: filter.sort, order: filter.sortOrder }}
          onChange={onCustomSelectOptionChangedHandler}
          options={sortingOptions}
        ></CustomSelect> */}
      </div>
    </div>
  );
}

export default UserFilter;
