import React, { useRef, useEffect } from "react";

type InputComponentProps = {
    content: string
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    handleEdit: any
  }

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(props: InputComponentProps, ref: any) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        
        function handleClickOutside(event: MouseEvent) {
            console.log("CURRENT REF", ref.current)
            if (ref && !ref.current.contains(event.target)) {
                props.setIsEditing(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */


export const InputComponent = (props: InputComponentProps) => {
    const inputElement = useRef<HTMLInputElement | null>(null);
    useOutsideAlerter(props, inputElement);

    return <input ref={inputElement} value={props.content} onChange={props.handleEdit}>
    </input>;
}