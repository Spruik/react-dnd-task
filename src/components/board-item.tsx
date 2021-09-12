import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

// Define types for board item element properties
type BoardItemProps = {
  index: number
  item: any
  onEditTask: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 8px;
  background-color: ${props => (props.isDragging ? '#d3e4ee' : '#fff')};
  border-radius: 4px;
  transition: background-color 0.25s ease-out;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`
// Create style for edit button element
const EditButton = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  float: right;
  color: #ffffff;
  border-radius: 3px;
  padding: 4px 8px;
  border: none;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
  :active{
    opacity: 0.5
  }
`

// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [content, setContent] = React.useState(props.item.content)
  const onClickEditButton = () => {
    if (isEditing) {
      props.onEditTask(props.item.id, content)
    }
    setIsEditing(!isEditing)
  }
  const handleContentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <BoardItemEl
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {isEditing ? (
            <input value={content} onChange={handleContentOnChange} />
          ) : (
            props.item.content
          )}

          <EditButton onClick={onClickEditButton}>
            {isEditing ? 'save' : 'edit'}
          </EditButton>
        </BoardItemEl>
      )}
    </Draggable>
  )
}
