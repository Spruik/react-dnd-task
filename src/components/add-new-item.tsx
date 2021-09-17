import React, {useState} from 'react'
import {Button} from "react-bootstrap"
import { useFocus } from "../utils/useFocus"

interface AddNewItemProps {
    handleAdd(text: string): void;
    columnId: string
  }

export default function AddNewItem(props: AddNewItemProps) {
    const [text, setText] = useState("");
    const inputRef = useFocus()

    const { handleAdd } = props;
    return (
        <form onSubmit={() => props.handleAdd(text)}>
            <input 
            ref={inputRef} 
            placeholder="Enter a new task" 
            value={text} 
            onChange={(e) => setText(e.target.value)}></input>
            <Button type="submit" variant="primary">Add Task</Button>
        </form>
    )
}
