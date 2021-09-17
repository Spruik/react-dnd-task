import * as React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { NewItemForm } from './new-item-form'

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

export class Board extends React.Component {
  // Initialize board state with board data
  state = initialBoardData
  
  // Handle drag & drop
  onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result
    console.log(result)
    // Do nothing if item is dropped outside the list
    if (!destination) {
      return
    }

    // Do nothing if the item is dropped into the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
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

  handleAddItem = (itemText: string, columnId: string) => {
    console.log("COLUMN ID:", columnId)
    const column = this.state.columns as any
    const columnStart = column[columnId]
    
    const itemIds = Array.from(columnStart.itemsIds) as any

    let taskLength = 0

    for (const property in column) {
      console.log("WHAT IS PROPERTY", property)
      //calculate the total tasks
      taskLength += column[property].itemsIds.length
    }

    const index = taskLength + 1
    console.log("WHAT IS TASK LENGTH", taskLength)

    const newItemId = `item-${index}`
    const content = `Content of item ${index}.`
    console.log("WHAT IS THE NEW ITEM", `${newItemId}: ${content}`)

    itemIds.push(newItemId)

    const newColumnStart = {
      ...columnStart,
      itemsIds: itemIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumnStart.id]: newColumnStart
      },
      items: {
        ...this.state.items,
        [newItemId]: { id: newItemId, content: content}
      }
    }
    this.setState(newState)
    return
  }

  render() {
    console.log(initialBoardData)
    return (

      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable 
          droppableId="columns"    direction="horizontal" 
          type="column">
          {(provided, snapshot) => 
            <BoardEl 
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {this.state.columnsOrder.map(columnId => {
                // Get id of the current column
                const column = (this.state.columns as any)[columnId]

                // Get item belonging to the current column
                const items = column.itemsIds.map((itemId: string) => (this.state.items as any)[itemId])
                // Render the BoardColumn component
                return <BoardColumn 
                  key={column.id} 
                  column={column}
                  handleAddItem={this.handleAddItem}
                  items={items} />
              })}
              {provided.placeholder}
              </BoardEl>
            } 
            </Droppable>

            </DragDropContext>
    )}
}