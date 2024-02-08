import  React from "react";
import UsersListContainer from "./../components/model/users/UsersListContainer";

const UsersPage = () => {
    return (
        <UsersListContainer
            itemsLimitPerPage={5}
            fetchData={{
                fetchDataArgs: {},
            }}
        ></UsersListContainer>
    );
};

export default UsersPage;
