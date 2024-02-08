import React from "react";
import CustomButton from "./CustomButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function CreateNewPostButton(props) {
  return (
    <CustomButton
      type="button"
      onClick={props.onClickHandler}
      className={props.className}
    >
      <PlusCircleIcon className="h-6 w-6"></PlusCircleIcon>
    </CustomButton>
  );
}
export default CreateNewPostButton;
