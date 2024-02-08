import React from "react";
//import { CSSTransition, TransitionGroup } from "react-transition-group";
import classes from "./css/UserList.module.css";
import UserListItem from "./UserListItem";

const UserList = ({
    users,
    usersTotalCount,
    title,
    remove,
    edit,
    isUsersLoading,
    setSelectedUser,
}) => {
    const handlechange = (user) => {
        setSelectedUser(user);
    };

    if (usersTotalCount === 0)
        return <h1 className="text-center m-1">No users found!</h1>;

    return (
        <div id="userListSection" className={classes.userList}>
            {/* <TransitionGroup className={classes.userList}> */}
            {users &&
                users.map((user, index) => (
                    // <CSSTransition
                    //     key={user.id}
                    //     timeout={1000}
                    //     classNames="item"
                    // >
                    <UserListItem
                        key={user.id} // - is not needed here because it's used in <CSSTransition>
                        //number={index + 1}
                        user={user}
                        handlechange={handlechange}
                    ></UserListItem>
                    // </CSSTransition>
                ))}
            {/* </TransitionGroup> */}
        </div>
    );
};

export default UserList;
