import * as React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { ReactComponent as PlusIcon } from './plus-lg.svg'
import styled from 'styled-components'

// Import BoardItem component
import { BoardItem } from './board-item'

// Define types for board column element properties
type BoardColumnProps = {
  key: string,
  column: any,
  items: any,
  onAddTask: any,
  onEditTask: any,
  onMarkTask: any,
  index: any,
}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

type BoardColumnWrapperStyleProps = {
  isDragging: boolean
}

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div<BoardColumnWrapperStyleProps>`
  flex: 1 0 20%;
  margin: 8px;
  padding: 8px;
  background-color: ${props => props.isDragging ? '#ffe6e6' : '#e5eff5'};
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  & + & {
    margin-left: 12px;
  }
`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font-size: 35px;
  font-family: Arial, sans-serif;
  margin: 12px 0px 12px 12px;
`

const BoardColumnAddBtn = styled.button`
  font: 15px bold Arial, sans-serif;
  margin-left: auto;
  padding-right: 8px;
  border-radius: 5px;
  vertical-align: center;
  border: 3px solid DodgerBlue;
  background-color: DodgerBlue;
  color: White;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`

const StyledIcon = styled(PlusIcon)`
  width: 15px;
  height: 15px;
  margin: 0px 8px;
  float: left;
  fill: White;
`

const BoardColumnHeader = styled.div`
  display: flex;
  flex: 1;
  margin: 0px 0px 10px 0px;
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
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => (
          <BoardColumnWrapper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}>
            <BoardColumnHeader>
              <BoardColumnTitle>
                {props.column.title}
              </BoardColumnTitle>
              <BoardColumnAddBtn onClick={() => {props.onAddTask(props.column.id)}}>
                <StyledIcon/>
                Add Task
              </BoardColumnAddBtn>
            </BoardColumnHeader>
      
            <Droppable droppableId={props.column.id}>
              {(provided, snapshot) => (
                <BoardColumnContent
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {props.items.map((item: any, index: number) => <BoardItem key={item.id} item={item} index={index} onEditTask={props.onEditTask} onMarkTask={props.onMarkTask} type="task"/>)}
                  {provided.placeholder}
                </BoardColumnContent>
              )}
            </Droppable>
          </BoardColumnWrapper>
        )
      }
    </Draggable>
  )
}