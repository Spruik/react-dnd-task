import styled from "styled-components";
//Contains all the code for all the newly added styled-components 


//Create styles for the AddItemButton element ("Add another card" button)
export const AddItemButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font: 14px sans-serif;
  color: #7B8698;
  margin-top: 8px;
  border-radius: 4px;
  width: 100%;

  &:hover {
    background-color: #dadcdc;
    color: black;
  }
`

//Create styles for the NewItemFormContainer element 
export const NewItemFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

//Create styles for the NewItemButton element ("Add Card" button) 
export const NewItemButton = styled.button`
  background-color: #0079BF;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;

  &:hover {
    background-color: #0467A1;
  }

`

//Create styles for the Close Card element ("Cancel" button) 
export const CancelButton = styled.button`
  background-color: #cc0000;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;

  &:hover {
    background-color:  #ff3333;
  }

`

//Create styles for the close button (x button)
export const CloseButton = styled.div`
  display: inline-block;
  border-radius: 2px;
  border: none;
  box-shadow: none;
  color: grey;
  font-size: 0.1em;

  &:hover {
    color: black;
  }
`

//Create styles for the NewItemInput element ("Enter a desc for this card... textbox")
export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: 0px 1px 0 0 #091e4240;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  padding: 1em;
  width: 94%;
`;

//Create styles for the Modal Title
export const ModalColumnTitle = styled.h2`
font: 16px sans-serif;
font-weight: bold;
margin-bottom: 12px;
display: flex;
flex-direction: row;
align-items: center;
`