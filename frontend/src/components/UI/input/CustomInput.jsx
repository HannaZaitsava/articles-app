import React from 'react';

const CustomInput = React.forwardRef((props, ref) => {
  return (
    <input ref={ref} {...props} className={props.className}/>
  );
});

export default CustomInput;

