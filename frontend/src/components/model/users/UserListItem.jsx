import { React } from "react";
import AvatarExtendedInfo from "./AvatarExtendedInfo";

const UserListItem = (props) => {
    //const [followersTotalCount, setFollowersTotalCount] = useState(0);
    //const [saved, setSaved] = useState(false);

    // const followHandle = () => {
    //     saved
    //         ? setFollowersTotalCount((prev) => prev - 1)
    //         : setFollowersTotalCount((prev) => prev + 1);
    //     setSaved((prev) => !prev);
    // };

    return (
        <>
            <AvatarExtendedInfo user={props.user}></AvatarExtendedInfo>
        </>
    );
};

export default UserListItem;
