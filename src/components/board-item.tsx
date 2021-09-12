import * as React from "react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// Define types for board item element properties
type BoardItemProps = {
  index: number;
  item: any;
};

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean;
};

const ContentEl = styled.div`
  font: 14px sans-serif;

  font-weight: 400;
`;

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? "#fff" : "#404040")};
  width: 200px;
  border-radius: 4px;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.25s ease-out;
  color: ${(props) => (props.isDragging ? "black" : "white")};

  &:hover {
    background-color: #b3b3b3;
    color: black;
  }

  & + & {
    margin-top: 4px;
  }
`;

// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
  //controls whether edit field or item is displayed, if item is new initialise with edit field
  const [edit, setEdit] = useState(
    props.item.content === "New Item" ? true : false
  );
  const [content, setContent] = useState(props.item.content);

  //handle content change
  const handleChange = (evt: any) => {
    setContent(evt.target.value);
  };

  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <BoardItemEl
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {
            //if editing show text field, else show item
            !edit ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ContentEl>{content}</ContentEl>
                <button
                  style={{
                    borderRadius: "4px",
                    border: "none",
                    padding: "4px",
                    boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
              </div>
            ) : (
              <div>
                <input
                  style={{
                    borderRadius: "4px",
                    border: "none",
                    padding: "4px",
                    marginTop: "4px",
                  }}
                  value={content}
                  onChange={handleChange}
                ></input>
                <button
                  style={{
                    borderRadius: "4px",
                    border: "none",
                    padding: "4px",
                    marginTop: "4px",
                    boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={() => setEdit(false)}
                >
                  Save
                </button>
              </div>
            )
          }
        </BoardItemEl>
      )}
    </Draggable>
  );
};
