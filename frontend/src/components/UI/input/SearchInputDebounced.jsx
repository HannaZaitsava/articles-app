import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInputDebounced = (props) => {
  const [searchString, setSearchString] = useState(props.value);

  const debouncedSetFilter = useDebouncedCallback(
    () => props.onSearchTextChangedHandler(searchString),
    1000
  );

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchString(value);
    debouncedSetFilter(value);
  };

  return (
     <div id="searchInputDebounced_container" className="relative">
      <div id="searchInputDebounced_component" className="relative flex flex-row justify-between min-h-[38px] items-center w-full rounded bg-white border-[1px] border-solid  border-gray-300 overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <MagnifyingGlassIcon className="h-6 w-6"></MagnifyingGlassIcon>
        </div>
        <input
          onChange={onChangeSearch}
          value={searchString}
          className="peer w-full outline-none px-3 text-sm sm:text-base text-gray-700  border-none focus:ring-0"
          type="search"
          id="searchInput"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default SearchInputDebounced;
