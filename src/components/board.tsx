import * as React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MOVE_CARD, MOVE_LIST } from '../actions/actions';
import styled from 'styled-components';

// Import AddColumn component
import AddColumn from './add-column';
// Import BoardColumn component
import BoardColumn from './board-column';

type BoardProps = {
  dispatch: any;
  board: any;
};

// Create styles board element properties
const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 15px;
`;

const BoardContainer = styled.div`
  height: 100%;
  display: flex;
  overflow-x: auto;
`;

const AddColumnContainer = styled.div`
  width: 272px;
  margin: 10px;
  flex-shrink: 0;
`;

const AddColumnButtonContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 5px 8px;
  transition: background-color 85ms ease-in, opacity 40ms ease-in, border-color 85ms ease-in;
  height: fit-content;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

class Board extends React.Component<BoardProps> {
  state = {
    addingList: false
  };

  toggleAddingList = () => this.setState({ addingList: !this.state.addingList });

  handleDragEnd = (result: any) => {
    const { source, destination, type } = result;

    // dropped outside the allowed zones
    if (!destination) return;

    const { dispatch } = this.props;

    // Move list
    if (type === 'COLUMN') {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: MOVE_LIST,
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index
          }
        });
      }
      return;
    }

    // Move card
    if (source.index !== destination.index || source.droppableId !== destination.droppableId) {
      dispatch({
        type: MOVE_CARD,
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index
        }
      });
    }
  };

  render() {
    const { board } = this.props;
    const { addingList } = this.state;

    return (
      <BoardEl>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="COLUMN">
            {(provided, snapshot) => (
              <BoardContainer ref={provided.innerRef}>
                {board.lists.map((listId: any, index: any) => {
                  return <BoardColumn listId={listId} key={listId} index={index} />;
                })}

                {provided.placeholder}

                <AddColumnContainer>
                  {addingList ? (
                    <AddColumn toggleAddingList={this.toggleAddingList} />
                  ) : (
                    <AddColumnButtonContainer onClick={this.toggleAddingList}>
                      <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} /> Add a list
                    </AddColumnButtonContainer>
                  )}
                </AddColumnContainer>
              </BoardContainer>
            )}
          </Droppable>
        </DragDropContext>
      </BoardEl>
    );
  }
}

const mapStateToProps = (state: { board: any }) => ({ board: state.board });

export default connect(mapStateToProps)(Board);
