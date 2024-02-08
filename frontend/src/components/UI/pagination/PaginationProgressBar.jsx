import React from "react";

function PaginationProgressBar({
    elementNamePlural,
    showItemsCount = true,
    showPagesCount = true,
    showPercentage = true,
    elementsTotalCount = 0,
    fetchedElementsCount = 0,
    page = 0,
    totalPages = 0,
}) {
    const loadPercentage =
        Number(elementsTotalCount) === 0
            ? 100
            : Math.round((fetchedElementsCount * 100) / elementsTotalCount);

    return (
        <div className="w-full items-center m-auto">
            <div className="shadow bg-gray-300 h-1 w-full">
                <div
                    className="bg-gray-500 h-1"
                    style={{ width: loadPercentage + "%" }}
                ></div>
            </div>

            <div className="w-full text-xs py-2 text-gray-500 text-center">
                {showItemsCount && (
                    <div>
                        <span
                            className="max-sm:hidden"
                        >{`${fetchedElementsCount} out of ${elementsTotalCount} ${elementNamePlural} loaded`}</span>
                        <span
                            className="sm:hidden"
                        >{`${fetchedElementsCount} / ${elementsTotalCount} ${elementNamePlural}`}</span>
                    </div>
                )}

                {showPagesCount && (
                    <div>
                        <span
                            className="max-sm:hidden"
                        >{`Page ${page} out of ${totalPages}`}</span>
                        <span
                            className="sm:hidden"
                        >{`Pages ${page}/${totalPages}`}</span>
                    </div>
                )}

                {showPercentage && (
                    <div>{`${loadPercentage}% of ${elementNamePlural} loaded`}</div>
                )}
            </div>
        </div>
    );
}

export default PaginationProgressBar;
