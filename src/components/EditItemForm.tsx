import React, { useState } from "react";
import { NewItemFormContainer, NewItemButton, NewItemInput, CancelButton } from "../styles";
import { useFocus } from "../utils/useFocus"

interface EditItemForm {
  onAdd(text: string): void;
  onModalCancel(): void;
  oldContent: string;
}

export const EditItemForm = ({ onAdd, onModalCancel,oldContent}: EditItemForm) => {
  let [text, setText] = useState("");
  let [isEditted, setIsEditted] = useState(false);
  const inputRef = useFocus()
  // Function for the onKeyPress event handler 
  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter"){
        onAdd(text)
    }
}
 
  if(!isEditted)
  {
    text = oldContent;
  }
 return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        placeholder = "Edit the description of this card..."
        value={text}
        onChange={(e) => {setText(e.target.value);setIsEditted(true)}}
        onKeyPress={handleAddText}
        
      />
      <table>
        <th><NewItemButton onClick={() => onAdd(text)}>Confirm Edit</NewItemButton></th>
        <th><CancelButton onClick={() => onModalCancel()}> Cancel </CancelButton></th>
      </table>
    </NewItemFormContainer>
  );
};