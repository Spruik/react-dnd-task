import * as React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

// Import data for board
import { initialBoardData } from '../data/board-initial-data'

// Import BoardColumn component
import { BoardColumn } from './board-column'

// Create styles board element properties
const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

export class Board extends React.Component {
  // Initialize board state with board data
  state = initialBoardData

  // Handle drag & drop
  onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return
    }

    // Do nothing if the item is dropped into the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnsOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnsOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    }

    // Find column from which the item was dragged from
    const columnStart = (this.state.columns as any)[source.droppableId]

    // Find column in which the item was dropped
    const columnFinish = (this.state.columns as any)[destination.droppableId]

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list
      const newItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newItemsIds.splice(source.index, 1)

      // Insert the id of dragged item to the new position
      newItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for columns
      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds
      }

      // Create new board state with updated data for columns
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart
        }
      }

      // Update the board state with new data
      this.setState(newState)
    } else {
      // Moving items from one list to another
      // Get all item ids in source list
      const newStartItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newStartItemsIds.splice(source.index, 1)

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds
      }

      // Get all item ids in destination list
      const newFinishItemsIds = Array.from(columnFinish.itemsIds)

      // Insert the id of dragged item to the new position in destination list
      newFinishItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds
      }

      // Create new board state with updated data for both, source and destination columns
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      }

      // Update the board state with new data
      this.setState(newState)
    }
  }

  // Handle adding new task
  onAddTask = (columnId: any) => {
    var numItems = 0
    for(var i in this.state.items) {
      numItems++
    }

    const newId = numItems + 1
    const newTaskId = "item-" + newId
    const newTaskContent = "Content of item " + newId + " - Click here to edit."
    const newTasks = {
      ...this.state.items,
      [newTaskId]: { id: newTaskId, content: newTaskContent }
    }

    const targetColumn = (this.state.columns as any)[columnId]
    const newItemsIds = Array.from(targetColumn.itemsIds)
    newItemsIds.splice(newItemsIds.length, 0, newTaskId)
    const newColumn = {
      ...targetColumn,
      itemsIds: newItemsIds
    }

    const newState = {
      ...this.state,
      items: newTasks,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    }
    
    this.setState(newState)
  }

  onEditTask = (itemId: any, itemContent: any) => {
    const targetItem = (this.state.items as any)[itemId]
    const newItem = {
      ...targetItem,
      content: itemContent
    }
    
    const newState = {
      ...this.state,
      items: {
         ...this.state.items,
         [newItem.id]: newItem
      }
    }
    
    this.setState(newState)
  }
  
  onMarkTask = (itemId: any, marked: any) => {
    const targetItem = (this.state.items as any)[itemId]
    const newItem = {
      ...targetItem,
      marked: !marked
    }
    
    const newState = {
      ...this.state,
      items: {
         ...this.state.items,
         [newItem.id]: newItem
      }
    }
    
    this.setState(newState)
  }

  render() {
    return(
      <BoardEl>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
                <BoardWrapper {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    this.state.columnsOrder.map((columnId, index) => {
                      // Get id of the current column
                      const column = (this.state.columns as any)[columnId]

                      // Get item belonging to the current column
                      const items = column.itemsIds.map((itemId: string) => (this.state.items as any)[itemId])

                      // Render the BoardColumn component
                      return <BoardColumn key={column.id} column={column} items={items} index={index} onAddTask={this.onAddTask} onEditTask={this.onEditTask} onMarkTask={this.onMarkTask}/>
                    })
                  }
                  {provided.placeholder}
                </BoardWrapper>
              )
            }
          </Droppable>
        </DragDropContext>
      </BoardEl>
    )
  }
}