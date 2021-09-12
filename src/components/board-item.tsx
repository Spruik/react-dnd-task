import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CHANGE_CARD_TEXT, CHANGE_CARD_TEXT_MESSAGE, DELETE_CARD } from '../actions/actions';
import styled from 'styled-components';

// Import BoardItemEditor component
import BoardItemEditor from './board-item-editor';

// Define types for board item element properties
type BoardItemProps = {
  index: number;
  item?: any;
  card: any;
  dispatch: any;
  listId: any;
};

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean;
};

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
  background-color: ${(props) => (props.isDragging ? '#d3e4ee' : '#fff')};
  transition: background-color 0.25s ease-out;
  position: relative;
  cursor: pointer;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  font-size: 15px;
  overflow-wrap: break-word;
  min-height: 18px;

  &:hover {
    background: #f5f6f7;
  }
`;

const CardIcons = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CardIcon = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 1px;
  color: rgba(0, 0, 0, 0.5);
  background: #f5f6f7;
  opacity: 0.9;

  &:hover {
    opacity: 1;
    background: rgba(220, 220, 220, 1);
  }
`;

// Create and export the BoardItem component
const BoardItem = (props: BoardItemProps) => {
  const [states, setStates] = useState({
    hover: false,
    editing: false,
    text: ''
  });

  const startHover = () => setStates({ ...states, hover: true });
  const endHover = () => setStates({ ...states, hover: false });

  const startEditing = () =>
    setStates({
      hover: false,
      editing: true,
      text: props.card.text
    });

  const endEditing = () => setStates({ ...states, hover: false, editing: false });

  const editCard = async (text: any) => {
    const { card, dispatch } = props;

    endEditing();

    dispatch({
      type: CHANGE_CARD_TEXT,
      payload: { cardId: card._id, cardText: text }
    });
  };

  const deleteCard = async () => {
    const { listId, card, dispatch } = props;

    if (window.confirm(CHANGE_CARD_TEXT_MESSAGE)) {
      dispatch({
        type: DELETE_CARD,
        payload: { cardId: card._id, listId }
      });
    }
  };

  if (!states.editing) {
    return (
      <Draggable draggableId={props.card._id} index={props.index}>
        {(provided, snapshot) => (
          <BoardItemEl
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={startHover}
            onMouseLeave={endHover}
          >
            {states.hover && (
              <CardIcons>
                <CardIcon onClick={startEditing}>
                  <FontAwesomeIcon icon={faPen} />
                </CardIcon>
              </CardIcons>
            )}
            {props.card.text}
          </BoardItemEl>
        )}
      </Draggable>
    );
  } else {
    return <BoardItemEditor text={props.card.text} onSave={editCard} onDelete={deleteCard} onCancel={endEditing} />;
  }
};

const mapStateToProps = (state: { cardsById: { [x: string]: any } }, ownProps: { cardId: string | number }) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(BoardItem);
