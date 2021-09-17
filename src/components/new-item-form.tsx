import React, {useState} from 'react'
import { useFocus } from '../utils/useFocus'
import '../styles/styles.css'

interface NewItemFormProps {
    handleAddItem: (e: React.FormEvent) => void;
}
export const NewItemForm = (props: NewItemFormProps) => {
    return (
        <form className="input">
        <input type="input" placeholder="Enter a new task" className="input__box"/>
        <button type="submit" className="input_submit">
        Add a new item
      </button>
        </form>
    )
}
