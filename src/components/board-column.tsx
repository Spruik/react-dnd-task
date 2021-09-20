import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

// Import BoardItem component
import { BoardItem } from './board-item'


// Define types for board column element properties
type BoardColumnProps = {
  key: string,
  column: any,
  items: any,
  handleDeleteItem: any,
  index: number
  // saveData: any
}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #f2f2f2;
  border-radius: 4px;
  
  & + & {
    margin-left: 12px;
  }
`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font-size: 14px
  margin-bottom: 12px;
`

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`

  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = (props) => {

  console.log("COLUMN", props.column)
  return(
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => (
    <BoardColumnWrapper
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
>
      <BoardColumnTitle>
        {props.column.title}
      </BoardColumnTitle>
      

      <Droppable droppableId={props.column.id} type="item">
        {(provided, snapshot) => (

          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.map((item: any, index: number) => 
            <BoardItem 
              key={item.id} 
              item={item}
              column={props.column} 
              index={index}
              // saveData={props.saveData}
              handleDeleteItem={props.handleDeleteItem}
            />
            )}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
    )}
    </Draggable>
  )
}