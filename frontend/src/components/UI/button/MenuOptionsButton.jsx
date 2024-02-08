import React from "react";
import { Bars4Icon, BarsArrowUpIcon } from "@heroicons/react/24/outline";

function MenuOptionsButton(props) { 
  return (
    <div className="relative">
      <div>
        <button
        type="button"
        onClick={() => props.setOpen(!props.open)}          
          className={props.className}
        >                  
          {props.open ? (
            <BarsArrowUpIcon className="h-6 w-6 max-sm:-scale-y-100" />
          ) : (
            <Bars4Icon className="h-6 w-6" />
          )}
        </button>        
      </div>    
    </div>   
  );
}

export default MenuOptionsButton;
