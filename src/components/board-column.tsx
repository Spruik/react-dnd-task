import * as React from 'react';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import shortid from 'shortid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ADD_CARD, CHANGE_LIST_TITLE, DELETE_LIST, DELETE_LIST_MESSAGE } from '../actions/actions';
import styled from 'styled-components';

// Import BoardColumnEditor component
import BoardColumnEditor from './board-column-editor';
// Import BoardItemEditor component
import BoardItemEditor from './board-item-editor';
// Import BoardItem component
import BoardItem from './board-item';

// Define types for board column element properties
type BoardColumnProps = {
  listId: any;
  dispatch: any;
  list: any;
  index: any;
};

const BoardColumnContainer = styled.div`
  background: #dfe3e6;
  flex-shrink: 0;
  width: 272px;
  height: fit-content;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const BoardColumnTitle = styled.div`
  cursor: pointer;
  padding: 10px;
  overflow-wrap: break-word;
`;

const ToggleAddCard = styled.div`
  cursor: pointer;
  padding: 10px;
  color: #6b808c;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(9, 45, 66, 0.13);
    color: #17394d;
    text-decoration: underline;
  }
`;

class BoardColumn extends React.Component<BoardColumnProps> {
  state = {
    editingTitle: false,
    title: this.props.list ? this.props.list.title : '',
    addingCard: false
  };

  toggleAddingCard = () => this.setState({ addingCard: !this.state.addingCard });

  addCard = async (cardText: any) => {
    const { listId, dispatch } = this.props;

    this.toggleAddingCard();

    const cardId = shortid.generate();

    dispatch({
      type: ADD_CARD,
      payload: { cardText, cardId, listId }
    });
  };

  toggleEditingTitle = () => this.setState({ editingTitle: !this.state.editingTitle });

  handleChangeTitle = (e: { target: { value: any } }) => this.setState({ title: e.target.value });

  editListTitle = async () => {
    const { listId, dispatch } = this.props;
    const { title } = this.state;

    this.toggleEditingTitle();

    dispatch({
      type: CHANGE_LIST_TITLE,
      payload: { listId, listTitle: title }
    });
  };

  deleteList = async () => {
    const { listId, list, dispatch } = this.props;

    if (window.confirm(DELETE_LIST_MESSAGE)) {
      dispatch({
        type: DELETE_LIST,
        // @ts-ignore
        payload: { listId, cards: list.cards }
      });
    }
  };

  render() {
    const { list, index } = this.props;
    const { editingTitle, addingCard, title } = this.state;

    return (
      // @ts-ignore
      <Draggable draggableId={list._id} index={index}>
        {(provided, snapshot) => (
          <BoardColumnContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {editingTitle ? (
              <BoardColumnEditor
                title={title}
                handleChangeTitle={this.handleChangeTitle}
                saveList={this.editListTitle}
                onClickOutside={this.editListTitle}
                deleteList={this.deleteList}
              />
            ) : (
              <BoardColumnTitle onClick={this.toggleEditingTitle}>{list.title}</BoardColumnTitle>
            )}
            <Droppable droppableId={list._id}>
              {(provided, _snapshot) => (
                <div ref={provided.innerRef}>
                  {list.cards &&
                    list.cards.map((cardId: any, index: number) => (
                      <BoardItem key={cardId} cardId={cardId} index={index} listId={list._id} />
                    ))}

                  {provided.placeholder}

                  {addingCard ? (
                    <BoardItemEditor onSave={this.addCard} onCancel={this.toggleAddingCard} adding />
                  ) : (
                    <ToggleAddCard onClick={this.toggleAddingCard}>
                      <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} /> Add a card
                    </ToggleAddCard>
                  )}
                </div>
              )}
            </Droppable>
          </BoardColumnContainer>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state: { listsById: { [x: string]: any } }, ownProps: { listId: string | number }) => ({
  list: state.listsById[ownProps.listId]
});

export default connect(mapStateToProps)(BoardColumn);
