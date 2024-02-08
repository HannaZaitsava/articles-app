import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

const MOUSE_UP = "mouseup";

function useOutsideClick(handleClose, ref) {
    const handleClick = useCallback(
        (event) => {
            if (ref && ref.current && !ref.current.contains(event.target)) {
                handleClose();
            }
        },
        [handleClose, ref]
    );

    useEffect(() => {
        document.addEventListener(MOUSE_UP, handleClick, true);

        return () => {
            document.removeEventListener(MOUSE_UP, handleClick, true);
        };
    }, [handleClick]);
    return { handleClose };
}

useOutsideClick.propTyoes = {
    handleClose: PropTypes.func.isRequired,
    ref: PropTypes.element.isRequired,
};
export default useOutsideClick;

// const useOutsideClick = (callback) => {
//   const ref = useRef();

//   useEffect(() => {
//     const handleClick = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         callback();
//       }
//     };

//     document.addEventListener('click', handleClick, true);

//     return () => {
//       document.removeEventListener('click', handleClick, true);
//     };
//   }, [ref]);

//   return ref;
// };

//export default useOutsideClick;
