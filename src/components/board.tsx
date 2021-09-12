import * as React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Modal from 'react-modal'
import AssignmentIcon from '@material-ui/icons/Assignment';
import { ModalColumnTitle } from "../styles"

// Import data for board
import { initialBoardData } from '../data/board-initial-data'

// Import BoardColumn component
import { BoardColumn } from './board-column'
import { EditItemForm } from './EditItemForm'


// Create styles board element properties
const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between; 
`

// Edit Modal styles
const customStyles = {
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '20%',
    transform: 'translate(-40%, -10%)',
    background: ' #e5eff5'
    },
  };

export class Board extends React.Component {
  // Initialize board state with board data
  state = initialBoardData

  // Handle drag & drop  
  onDragEnd = (result: any) => {
    console.log("result")
    console.log(result)
    
    const { source, destination, draggableId,type } = result 

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return
    }

    // Do nothing if the item is dropped into the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if(type === "column"){
      const newColumnIds = draggableId;
      const newIndex = destination.index;
      let newColumnOrder : any = this.state.columnsOrder
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(newIndex,0,newColumnIds);
      // console.log("newColumnOrder")
      // console.log(newColumnOrder)
      this.setState({columnsOrder:newColumnOrder})
    }
    else 
    {
    // const newColumnOrder = this.state.columnsOrder;
    // newColumnOrder.splice(source.index, 1);
    // newColumnOrder.splice(destination.index,0,draggableId);
    
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
  }

  // Fetches last column id value (e.g. column-1, lastID = 1) 
  getLastNumericId = () =>
  {
    const {items} = this.state;
    if(items && Object.keys(items).length > 0)
    {
      let item;
      for(item in items){}
      
      if(item) 
      {
      return item.split("-")[1];
      }
    }
    return '0';
  }

  // displays Modal component 
  showEditModal = (itemId:string,oldContent:string) =>
  {
    
    this.setState({editVisible:true , currentEditableItemId: itemId,currentEditableContent: oldContent })
  }
 
  editItem = (text: string)=>
  {
    let {currentEditableItemId,items} = this.state;
    const updatedItems : any = items;
    updatedItems[currentEditableItemId].content = text;
    items = updatedItems;
    currentEditableItemId = '';
    this.setState({currentEditableItemId,items,editVisible:false})
  }

  onAddNewCard = (cardText: string, columnId: string) =>
  {
    let {columns, items} = this.state;

    // Finding item it
    const lastId = this.getLastNumericId();
    const currentId = parseInt(lastId) + 1;
    const currentIdFull = "item-"+currentId;
    // console.log("currentIdFull")
    // console.log(currentIdFull)
        
    // board item (card) object with id and content(text) then save it into the items list
    const card = {
      id: currentIdFull,
      content: cardText,
    }

    const updatedItems : any = items;
    updatedItems[currentIdFull] = card;
    items = updatedItems;

    // console.log("updated items ")
    // console.log(items)

    // saves the item id into itemsIds list and update columns with updated values 
    const updatedColumns: any = columns; 
    const updatedColumn = updatedColumns[columnId]; 
    updatedColumn.itemsIds.push(currentIdFull);
    updatedColumns[columnId] = updatedColumn; 
    columns = updatedColumns;
    
    // console.log("updated columns")
    // console.log(columns)
    
    // save the state with the latest updated data
    this.setState(columns)
    this.setState(items)
    
    // console.log("add card text")
    // console.log(cardText)
    // console.log("column id ")
    // console.log(columnId)

  }

  render() {
    // console.log("state")
    // console.log(this.state)
   // const dropId = 'droppable-1';
    return(
    <div>
      
      <Modal
        isOpen = {this.state.editVisible}
        style =  {customStyles}
      >
        <ModalColumnTitle><AssignmentIcon></AssignmentIcon>Editing Card</ModalColumnTitle>  
        <EditItemForm 
        oldContent={this.state.currentEditableContent} 
        onModalCancel={()=> this.setState({currentEditableItemId:"",editVisible:false})} 
        onAdd={(text)=>this.editItem(text)}></EditItemForm> 
      </Modal>

      <DragDropContext onDragEnd={this.onDragEnd}  >
      <Droppable  droppableId="all-columns"
          direction="horizontal"
          type="column">
          {(provided, snapshot) => (
      <BoardEl {...provided.droppableProps}
      ref={provided.innerRef}
      >
        {/* <DragDropContext onDragEnd={this.onDragEnd} > */}
          {this.state.columnsOrder.map((columnId , index) => {
            // Get id of the current column
            const column = (this.state.columns as any)[columnId]
            
            // console.log("columns")
            // console.log(column)

            // Get item belonging to the current column
            const items = column.itemsIds.map((itemId: string) => (this.state.items as any)[itemId])
            // console.log("items")
            // console.log(items)

            // Render the BoardColumn component
            return <BoardColumn 
              key={column.id} 
              column={column} 
              items={items} 
              onAddNewCard={this.onAddNewCard} 
              orderIndex={index}
              onShowEditModal={(itemId,oldContent)=>this.showEditModal(itemId,oldContent)}/>
          })}
        {provided.placeholder}
        {/* </DragDropContext> */}
      </BoardEl>
          )}
      </Droppable>
      </DragDropContext>
      </div>
    )
  }
}