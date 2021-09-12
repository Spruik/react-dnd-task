import { initialBoardData } from "../data/board-initial-data";
import { ADD_LIST, ADD_CARD } from "../actions/actions";

// @ts-ignore
export default function seed(store) {
  const { items, columns } = initialBoardData;

  for (const [key, value] of Object.entries(columns)) {
    console.log(`${key}: ${value}`);

    store.dispatch({
      type: ADD_LIST,
      payload: { listId: key, listTitle: value.title },
    });

    value.itemsIds.forEach((item, index) => {
      console.log(item, index);

      store.dispatch({
        type: ADD_CARD,
        payload: {
          listId: key,
          // @ts-ignore
          cardId: items[item].id,
          // @ts-ignore
          cardText: items[item].content,
        },
      });
    });
  }
}
