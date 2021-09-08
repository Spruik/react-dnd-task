import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { EditText } from 'react-edit-text'
import { ReactComponent as StarIcon } from './star.svg'
import { ReactComponent as StarFillIcon } from './star-fill.svg'
import 'react-edit-text/dist/index.css';

// Define types for board item element properties
type BoardItemProps = {
  index: number
  item: any
  type: any
  onEditTask: any
  onMarkTask: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
  display: flex;
  flex: 1;
  padding: 8px;
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  border-radius: 4px;
  transition: background-color .25s ease-out;
  font: 15px Arial, sans-serif;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`

const IconWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  svg {
    width: 25px;
    height: 25px;
    margin: 0px 8px;
    fill: #a1a1a1;
    cursor: pointer;
  }
`

const IconToggle = (props: any) => {
  return props.toggle ? <StarFillIcon/> : <StarIcon/>
}

// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
    const [text, setText] = React.useState(props.item.content)

    return <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <BoardItemEl
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <EditText
            name="textbox"
            style={{width: '350px', font: '20px Arial, sans-serif'}}
            value={text}
            onChange={setText}
            onSave={() => {props.onEditTask(props.item.id, text)}}/>
          <IconWrapper onClick={() => {props.onMarkTask(props.item.id, props.item.marked)}}>
            <IconToggle toggle={props.item.marked}/>
          </IconWrapper>
        </BoardItemEl>
      )}
    </Draggable>
  }