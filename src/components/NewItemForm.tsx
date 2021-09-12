import React, { useState } from "react";
import { NewItemFormContainer, NewItemButton, NewItemInput, CancelButton} from "../styles";
import { useFocus } from "../utils/useFocus"


interface NewItemFormProps {
  onAdd(text: string): void;
  onCancelAdd():void; 
}

export const NewItemForm = ({ onAdd,onCancelAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus()

  // Function for the onKeyPress event handler 
  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter"){
        onAdd(text)
    }
}

 return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        placeholder = "Enter a description for this card..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleAddText}
      />
      <table>
        <th><NewItemButton onClick={() => onAdd(text)}>Confirm Edit</NewItemButton></th>
        <th><CancelButton onClick={()=>onCancelAdd}>Cancel</CancelButton></th>
      </table>
    </NewItemFormContainer>
  );
};