import * as React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// Import BoardItem component
import { BoardItem } from "./board-item";

// Define types for board column element properties
type BoardColumnProps = {
  key: string;
  column: any;
  items: any;
  index: any;
  addItem: (columnId: string) => void;
};

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean;
};

type BoardColumnStylesProps = {
  isDragging: boolean;
};

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div<BoardColumnStylesProps>`
  flex: 1;
  padding: 16px;
  padding-top: 0px;
  background-color: ${(props) => (props.isDragging ? "#4d4d4f" : "#282828")};
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`;

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 24px sans-serif;
  color: white;
  font-weight: 700;
  margin-bottom: 12px;
`;

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  padding: 4px;
  background-color: ${(props) => (props.isDraggingOver ? "#121212" : null)};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  const handleAddItem = () => {
    props.addItem(props.column.id);
  };

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <BoardColumnWrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <BoardColumnTitle>{props.column.title}</BoardColumnTitle>

          <Droppable droppableId={props.column.id} type="column">
            {(provided, snapshot) => (
              <BoardColumnContent
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {console.log(snapshot)}
                {console.log("SNAP")}
                {props.items.map((item: any, index: number) => (
                  <BoardItem key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </BoardColumnContent>
            )}
          </Droppable>
          <div
            style={{ width: "fit-content", margin: "auto", marginTop: "10px" }}
          >
            <button
              style={{
                borderRadius: "4px",
                border: "none",
                padding: "4px",
                fontWeight: 400,
              }}
              onClick={handleAddItem}
            >
              New item
            </button>
          </div>
        </BoardColumnWrapper>
      )}
    </Draggable>
  );
};
