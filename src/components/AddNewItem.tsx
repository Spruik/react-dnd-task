import React, { useState } from "react"
import { AddItemButton } from "../styles"
import { NewItemForm } from "./NewItemForm"
import AddIcon from '@material-ui/icons/Add'

interface AddNewItemProps {
  onAdd(text: string): void;
  toggleButtonText: string;

}

export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText} = props;
 
  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        } } 
        onCancelAdd={()=>setShowForm(false)} 
        />
    );
  }
  return (
    <AddItemButton onClick={() => setShowForm(true)}>
      <AddIcon fontSize='small'>add_icon</AddIcon>
      {toggleButtonText}
    </AddItemButton>
  );
};