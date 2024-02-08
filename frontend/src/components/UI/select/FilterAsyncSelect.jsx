import React from "react";
import AsyncSelect from "react-select/async";

const FilterAsyncSelect = ({ loadOptions, defaultOptions, value, handleInputChange, placeholder}) => {
    return (
        <AsyncSelect
            isMulti
            isSearchable={false}
            placeholder={placeholder}
            cacheOptions
            //defaultOptions
            defaultOptions={defaultOptions}
            //loadOptions={getOptionsFunc}
            loadOptions={loadOptions}
            onChange={handleInputChange}
        />
    );
};

export default FilterAsyncSelect;
