import { ADD_CARD, ADD_LIST, CHANGE_LIST_TITLE, DELETE_CARD, DELETE_LIST, MOVE_CARD } from '../actions/actions';

export const listsReducers = (
  state = {},
  action: {
    type: any;
    payload: {
      listId?: any;
      listTitle?: any;
      cardId?: any;
      oldCardIndex?: any;
      newCardIndex?: any;
      sourceListId?: any;
      destListId?: any;
    };
  }
) => {
  switch (action.type) {
    case ADD_LIST: {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, cards: [] }
      };
    }
    case CHANGE_LIST_TITLE: {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        // @ts-ignore
        [listId]: { ...state[listId], title: listTitle }
      };
    }
    case DELETE_LIST: {
      const { listId } = action.payload;
      // @ts-ignore
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    case ADD_CARD: {
      const { listId, cardId } = action.payload;
      return {
        ...state,
        // @ts-ignore
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] }
      };
    }
    case MOVE_CARD: {
      const { oldCardIndex, newCardIndex, sourceListId, destListId } = action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        // @ts-ignore
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          // @ts-ignore
          [sourceListId]: { ...state[sourceListId], cards: newCards }
        };
      }
      // Move card from one list to another
      // @ts-ignore
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      // @ts-ignore
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        // @ts-ignore
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        // @ts-ignore
        [destListId]: { ...state[destListId], cards: destinationCards }
      };
    }
    case DELETE_CARD: {
      const { cardId: deletedCardId, listId } = action.payload;
      const filterDeleted = (cardId: any) => cardId !== deletedCardId;
      return {
        ...state,
        [listId]: {
          // @ts-ignore
          ...state[listId],
          // @ts-ignore
          cards: state[listId].cards.filter(filterDeleted)
        }
      };
    }
    default:
      return state;
  }
};
