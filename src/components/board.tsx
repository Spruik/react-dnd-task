import * as React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

// Import data for board
import { initialBoardData } from "../data/board-initial-data";

// Import BoardColumn component
import { BoardColumn } from "./board-column";

type BoardStylesProps = {
  isDraggingOver: boolean;
};

// Create styles board element properties
const BoardEl = styled.div<BoardStylesProps>`
  border: none;
  border-radius: 4px;
  box-shadow: inset 1px 1px 8px rgba(0, 0, 0, 0.2);
  width: fit-content;
  margin: auto;
  padding: 10px;
  display: flex;
  background: #121212;
  align-items: flex-start;
  background-color: ${(props) =>
    props.isDraggingOver ? "rgba(255,255,255,0.1)" : null};
  justify-content: space-between;
`;

export class Board extends React.Component {
  // Initialize board state with board data
  state: any = initialBoardData;

  // Handle drag & drop
  onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    console.log(result);

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return;
    }

    // Do nothing if the item is dropped into the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //do nothing if trying to drop column into list
    if (source.droppableId === "board" && destination.droppableId !== "board") {
      return;
    }

    //do nothing if trying to drop list into column
    if (source.droppableId !== "board" && destination.droppableId === "board") {
      return;
    }

    //when moving columns the source droppable ID is always 'board'
    if (source.droppableId === "board") {
      const newColumnsOrder = this.state.columnsOrder;

      // Remove the column id from columnsOrder using its source index
      newColumnsOrder.splice(source.index, 1);

      // Insert the the columnId into its new position using its destination index
      newColumnsOrder.splice(destination.index, 0, draggableId);

      // Create new board state with updated data for column orders
      const newState = {
        ...this.state,
        columnsOrder: newColumnsOrder,
      };

      // Update the board state with new data
      this.setState(newState);
      return;
    }

    // Find column from which the item was dragged from
    const columnStart = (this.state.columns as any)[source.droppableId];

    // Find column in which the item was dropped
    const columnFinish = (this.state.columns as any)[destination.droppableId];

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list
      const newItemsIds = Array.from(columnStart.itemsIds);

      // Remove the id of dragged item from its original position
      newItemsIds.splice(source.index, 1);

      // Insert the id of dragged item to the new position
      newItemsIds.splice(destination.index, 0, draggableId);

      // Create new, updated, object with data for columns
      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds,
      };

      // Create new board state with updated data for columns
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart,
        },
      };

      // Update the board state with new data
      this.setState(newState);
    } else {
      // Moving items from one list to another
      // Get all item ids in source list
      const newStartItemsIds = Array.from(columnStart.itemsIds);

      // Remove the id of dragged item from its original position
      newStartItemsIds.splice(source.index, 1);

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds,
      };

      // Get all item ids in destination list
      const newFinishItemsIds = Array.from(columnFinish.itemsIds);

      // Insert the id of dragged item to the new position in destination list
      newFinishItemsIds.splice(destination.index, 0, draggableId);

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds,
      };

      // Create new board state with updated data for both, source and destination columns
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish,
        },
      };

      // Update the board state with new data
      this.setState(newState);
    }
  };

  //function to add items to state
  addItem = (columnId: string) => {
    //generate unique item ID and create new item
    let itemId = "id" + Math.random().toString(16).slice(2);
    let newItem = { id: itemId, content: "New Item" };

    //temp copy of column object and push new item into itemsIds
    let newColumn = this.state.columns[columnId];
    newColumn.itemsIds.push(itemId);

    //create new state object with updated data
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        newColumn,
      },
      items: { ...this.state.items, [itemId]: newItem },
    };

    // Update the board state with new data
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={"board"} direction="horizontal" type="board">
          {(provided, snapshot) => (
            <BoardEl
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.state.columnsOrder.map((columnId: any, index: number) => {
                // Get id of the current column
                const column = (this.state.columns as any)[columnId];

                // Get item belonging to the current column
                const items = column.itemsIds.map(
                  (itemId: string) => (this.state.items as any)[itemId]
                );

                // Render the BoardColumn component
                return (
                  <BoardColumn
                    key={column.id}
                    column={column}
                    items={items}
                    index={index}
                    addItem={this.addItem}
                  />
                );
              })}
              {provided.placeholder}
            </BoardEl>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
