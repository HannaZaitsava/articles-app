import { BookmarkIcon as SaveArticleIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SaveArticleSaved } from "@heroicons/react/24/solid";
import React from "react";
import CustomButton from "./CustomButton";
import classes from "./SaveArticleButton.module.css";

function SaveArticleButton(props) {
  return (
    <div className={classes.saveButtonContainer}>
      <div>{props.savedTotalCount}</div>

      <CustomButton onClick={props.onClickHandler}>
        {props.saved
          ? <SaveArticleSaved className="h-6 w-6"></SaveArticleSaved>
          : <SaveArticleIcon className="h-6 w-6"></SaveArticleIcon>}
      </CustomButton>
    </div>
  );
}
export default SaveArticleButton;
