// value.order => 1: ascending, -1: descending
export const postsSortingOptions = [
    {
        key: "publicationDate",
        value: { sortField: "publicationDate", order: 1 },
        label: "By publication date",
    },
    {
        key: "publicationDateDesc",
        value: { sortField: "publicationDate", order: -1 },
        label: "By publication date - Desc",
    },
    // {
    //     key: "category",
    //     value: { sortField: "postCategoryId", order: 1 },
    //     label: "By category",
    // },
    // {
    //     key: "categoryDesc",
    //     value: { sortField: "postCategoryId", order: -1 },
    //     label: "By category - Desc",
    // },
    {
        key: "title",
        value: { sortField: "title", order: 1 },
        label: "By title",
    },
    {
        key: "titleDesc",
        value: { sortField: "title", order: -1 },
        label: "By title - Desc",
    },
    // {
    //     key: "username",
    //     value: { sortField: "userId", order: 1 },
    //     label: "By author",
    // },
    // {
    //     key: "usernameDesc",
    //     value: { sortField: "userId", order: -1 },
    //     label: "By author - Desc",
    // }
]
