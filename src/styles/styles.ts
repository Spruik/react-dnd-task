import styled from "styled-components";
// import styledProps from 'styled-props';
import { darken } from 'polished'

export const NewTaskButton = styled.button`
    background-color: #1a20e6;
    border-radius: 25%;
    border: none;
    color: #fff;
    text-align: center;
`
export const NewItemFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

export const NewItemInput = styled.input`
  border: none;
  padding: 1em;
  width: 100%;
`;


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