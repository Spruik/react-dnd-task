import React, { useRef, useState, useEffect } from "react";

type InputComponentProps = {
    content: string
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    saveEditedData: any,
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
            console.log("CURRENT REF", ref.current.value)
            if (ref && !ref.current.contains(event.target)) {
                props.saveEditedData(ref.current.value)
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
    const [input, setInput] = useState(props.content)
    const inputElement = useRef<HTMLInputElement | null>(null);
    useOutsideAlerter(props, inputElement);

    return <input ref={inputElement} value={input} onChange={(e) => {setInput(e.target.value)}}>
    </input>;
}