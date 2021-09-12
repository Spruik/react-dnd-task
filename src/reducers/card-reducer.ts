import { ADD_CARD, CHANGE_CARD_TEXT, DELETE_CARD, DELETE_LIST } from '../actions/actions';

export const cardReducers = (state = {}, action: { type: any; payload: { cardText?: any; cardId?: any; cards?: any } }) => {
  switch (action.type) {
    case ADD_CARD: {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { text: cardText, _id: cardId } };
    }
    case CHANGE_CARD_TEXT: {
      const { cardText, cardId } = action.payload;
      // @ts-ignore
      return { ...state, [cardId]: { ...state[cardId], text: cardText } };
    }
    case DELETE_CARD: {
      const { cardId } = action.payload;
      // @ts-ignore
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    // Find every card from the deleted list and remove it
    case DELETE_LIST: {
      const { cards: cardIds } = action.payload;

      return Object.keys(state)
        .filter((cardId) => !cardIds.includes(cardId))
        .reduce(
          // @ts-ignore
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    }
    default:
      return state;
  }
};
