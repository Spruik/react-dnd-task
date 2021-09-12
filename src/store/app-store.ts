import { combineReducers, createStore, EmptyObject } from 'redux';
import throttle from 'lodash.throttle';
import seed from './initialize-store';

// Import reducers
import { boardReducers } from '../reducers/board-reducer';
import { cardReducers } from '../reducers/card-reducer';
import { listsReducers } from '../reducers/column-reducer';

const reducers = combineReducers({
  board: boardReducers,
  listsById: listsReducers,
  cardsById: cardReducers
});

const saveState = (state: EmptyObject & { board: never; listsById: {}; cardsById: {} }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();
const store = createStore(reducers, persistedState);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

console.log(store.getState());
// @ts-ignore
if (!store.getState().board.lists.length) {
  console.log('SEED');
  seed(store);
}

export default store;
