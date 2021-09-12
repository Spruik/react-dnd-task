import * as React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import AddBoardItem from './add-board-item'

// Import BoardItem component
import { BoardItem } from './board-item'

// Define types for board column element properties
type BoardColumnProps = {
  key: string,
  column: any,
  items: any,
  colIndex: any, // Define column index
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
  background-color: #e5eff5;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
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
  return(
    <BoardColumnWrapper>
      <BoardColumnTitle>
      {props.column.title}
      </BoardColumnTitle>

      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.map((item: any, index: number) => <BoardItem key={item.id} item={item} index={index}/>)}
            {provided.placeholder}
            </BoardColumnContent>
        )}
      </Droppable>
      <AddBoardItem />
    </BoardColumnWrapper>
    /* trying to use columns as a draggable object but failed for some reason

      <Draggable draggableId={props.column.id} index={props.colIndex}>
        {(provided) => {
          <BoardColumnWrapper {...provided.draggableProps} ref={provided.innerRef}>
            <BoardColumnTitle {...provided.dragHandleProps}>
              {props.column.title}
            </BoardColumnTitle>

            <Droppable droppableId={props.column.id}>
              {(provided, snapshot) => (
              <BoardColumnContent
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.items.map((item: any, index: number) => <BoardItem key={item.id} item={item} index={index} />)}
                {provided.placeholder}
              </BoardColumnContent>
            )}
            </Droppable>
          </BoardColumnWrapper>
        }}
      </Draggable>
    */
  )
}