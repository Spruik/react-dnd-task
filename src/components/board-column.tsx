//import Column from 'rc-table/lib/sugar/Column'
import * as React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
// Import AddNewItem component 
import { AddNewItem } from "./AddNewItem"

// Import BoardItem component
import { BoardItem } from './board-item'

// Define types for board column element properties
type BoardColumnProps = {
  key: string,
  column: any,
  items: any,
  onAddNewCard:(cardText: string,columnId: string) => void,
  orderIndex: number;
  onShowEditModal:(itemId: string,oldContent: string)=>void,
}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}


type BoardColumnWrapperStylesProps = {
  isDragging: boolean
}

// Create styles for BoardColumnWrapper element (Column Containers)
const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  font-weight: bold;
  margin-bottom: 12px;

`

// Create styles for BoardColumnContent element (Card List)
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  // console.log("props")
  // console.log(props)
  return  (
    <Draggable draggableId={props.column.id} index={props.orderIndex}>
      {provided => (
      <BoardColumnWrapper
      {...provided.draggableProps}
      ref={provided.innerRef}
      > 
      <BoardColumnTitle {...provided.dragHandleProps}>
        {props.column.title}
      </BoardColumnTitle>
    
      <Droppable droppableId={props.column.id} type="items">
        {(provided, snapshot) => (
          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.map((item: any, index: number) => <BoardItem key={item.id} item={item} index={index} onEditModalShow={()=>props.onShowEditModal(item.id,item.content)} />)}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>  
      <AddNewItem            
              toggleButtonText ="Add another card"
              onAdd={(e)=>props.onAddNewCard(e,props.column.id)}
      />
    </BoardColumnWrapper>
     )}
    </Draggable>
    );
   }
