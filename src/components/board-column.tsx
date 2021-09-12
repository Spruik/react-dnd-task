import * as React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

// Import BoardItem component
import { BoardItem } from './board-item'

// Define types for board column element properties
type BoardColumnProps = {
  key: string
  column: any
  items: any
  onAddTask: any
  onEditTask: any
  index: number
}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

// Create styles for AddTaskButton element
const AddTaskButton = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  float: right;
  color: #ffffff;
  border-radius: 3px;
  padding: 4px 8px;
  margin: 3px 0;
  border: none;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
  :active {
    opacity: 0.5;
  }
`

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
  flex-basis: 300px;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

  & + & {
    margin-left: 12px;
  }
`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  height: 30px;
  line-height: 30px;
  margin-bottom: 12px;
`

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 200px;
  background-color: ${props => (props.isDraggingOver ? '#aecde0' : null)};
  border-radius: 4px;
`

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = props => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <BoardColumnWrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <BoardColumnTitle>
            {props.column.title}
            <AddTaskButton onClick={() => props.onAddTask(props.column.id)}>
              New Task
            </AddTaskButton>
          </BoardColumnTitle>

          <Droppable droppableId={props.column.id} type='item'>
            {(provided, snapshot) => (
              <BoardColumnContent
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.items.map((item: any, index: number) => (
                  <BoardItem
                    key={item.id}
                    item={item}
                    index={index}
                    onEditTask={props.onEditTask}
                  />
                ))}
                {provided.placeholder}
              </BoardColumnContent>
            )}
          </Droppable>
        </BoardColumnWrapper>
      )}
    </Draggable>
  )
}
