import * as React from 'react' 
import {useRef, useEffect} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { SvgIcon } from 'material-ui';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { InputComponent } from './input-component'


// Define types for board item element properties
type BoardItemProps = {
  index: number
  item: any
  handleOnEdit: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
  display: flex;
  padding: 8px;
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  border-radius: 4px;
  transition: background-color .25s ease-out;
  > span {
    width: 100%
    flexGrow: 3;
  }
  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`

const IconsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: right;

  > div {
    width: 30%
    text-align: right;
  }

  .editing {
    color: red;
  }

`

// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
    const [isEditing,setIsEditing] = React.useState(false)
    const [content, setContent] = React.useState(props.item.content)
    console.log("content", content)


    const onEditButtonClick = () => {
      console.log("BUTTON CLICKED!")
      if (isEditing) {
        props.handleOnEdit(props.item.id, content)
      }
      setIsEditing(!isEditing)
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value)
    }
    return <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <BoardItemEl
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {isEditing ? (
          <InputComponent 
          content={content} 
          isEditing={isEditing}
          setIsEditing={setIsEditing} 
          handleEdit={handleContentChange}/>
          ) : (
          <span>
          {content}
          </span>
          )}
          <IconsContainer>
            <div className="edit">
            <EditIcon className={isEditing ? "editing" : ""} 
            onClick={onEditButtonClick} 
            onBlur={(e) => setIsEditing(!isEditing)} />
            </div>

            <div className="save">
            <SaveIcon />
            </div>

            <div className="delete">
              <DeleteIcon/>
            </div>

            </IconsContainer>
        </BoardItemEl>
      )}
    </Draggable>
  }