import React from "react";
import CustomInput from "./CustomInput";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInput = React.forwardRef((props, ref) => {
  return (
    <div className="relative flex items-center w-full min-h-[38px] rounded-sm bg-white overflow-hidden border-2  border-gray-300">
      <div className="grid place-items-center h-full w-12 text-gray-300">
        <MagnifyingGlassIcon className="h-6 w-6"></MagnifyingGlassIcon>
      </div>
      <CustomInput
        ref={ref}
        {...props}
        className="peer w-full outline-none p-0 text-sm sm:text-base text-gray-700  border-none focus:ring-0"
        type="text"
        id="search"
        placeholder="Search.."
      />
    </div>
  );
});

export default SearchInput;
