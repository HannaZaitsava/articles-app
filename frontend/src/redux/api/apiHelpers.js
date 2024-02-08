export function providesTagList(resultsWithIds, tagType) {
    const res = resultsWithIds
    ? [
          { type: tagType, id: "LIST" },
          ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];

    console.log("providesTagList: ", res);
    return res;
}

export function getPagesCount(totalDataCount, dataLimitPerPage) {
    return dataLimitPerPage !== 0 && Boolean(totalDataCount)
        ? Math.ceil(totalDataCount / dataLimitPerPage)
        : 1;
}

export function getFetchedDataTotalCount(
    currentPageNumber,
    dataLimitPerPage,
    currentlyFetchedDataCount
) {
    if (currentPageNumber === undefined || currentPageNumber === 1) {
        return dataLimitPerPage === 0 ||
            (dataLimitPerPage > 0 &&
                dataLimitPerPage >= currentlyFetchedDataCount)
            ? currentlyFetchedDataCount
            : 0;
    } else
        return (
            (currentPageNumber - 1) * dataLimitPerPage +
            currentlyFetchedDataCount
        );
}

export function transformResponseForPagination(apiResponse, meta, arg) {
    const dataTotalCount = Number(
        meta?.response?.headers?.get("x-total-count")
    );
    return {
        apiResponse: apiResponse,
        fetchedDataTotalCount: getFetchedDataTotalCount(
            arg._page,
            arg._limit,
            apiResponse.length
        ),
        dataTotalCount: dataTotalCount,
        pagesTotalCount: getPagesCount(dataTotalCount, arg._limit),
    };
}
