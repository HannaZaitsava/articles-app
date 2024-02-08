// value.order => 1: ascending, -1: descending
export const usersSortingOptions = [
    {
        key: "username",
        value: { sortField: "username", order: 1 },
        label: "By user name",
    },
    {
        key: "usernameDesc",
        value: { sortField: "username", order: -1 },
        label: "By user name - Desc",
    },
    {
        key: "registrationDate",
        value: { sortField: "registrationDate", order: 1 },
        label: "By registration date",
    },
    {
        key: "registrationDateDesc",
        value: { sortField: "registrationDate", order: -1 },
        label: "By registration date - Desc",
    },
]
