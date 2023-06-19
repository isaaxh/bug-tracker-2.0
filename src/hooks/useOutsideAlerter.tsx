// import React, { useRef, useEffect } from "react";

// interface useOutsideAlerterProps {
//   ref: HTMLDivElement | MutableRefObject<null>;
// }

// /**
//  * Hook that alerts clicks outside of the passed ref
//  */
// function useOutsideAlerter({ ref }: useOutsideAlerterProps) {
//   useEffect(() => {
//     /**
//      * Alert if clicked on outside of element
//      */
//     function handleClickOutside(event: MouseEvent<Element, MouseEvent>) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         alert("You clicked outside of me!");
//       }
//     }
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", () => handleClickOutside);
//     };
//   }, [ref]);
// }

// /**
//  * Component that alerts if you click outside of it
//  */
// export default function OutsideAlerter(props) {
//   const wrapperRef = useRef(null);
//   useOutsideAlerter(wrapperRef);

//   return <div ref={wrapperRef}>{props.children}</div>;
// }
