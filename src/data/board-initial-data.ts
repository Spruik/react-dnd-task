export const initialBoardData = {
    items: {
      'item-1': { id: 'item-1', content: 'Task 1 - Click here to edit.', marked: false},
      'item-2': { id: 'item-2', content: 'Task 2 - Click here to edit.', marked: false},
      'item-3': { id: 'item-3', content: 'Task 3 - Click here to edit.', marked: false},
      'item-4': { id: 'item-4', content: 'Task 4 - Click here to edit.', marked: false},
      'item-5': { id: 'item-5', content: 'Task 5 - Click here to edit.', marked: false},
      'item-6': { id: 'item-6', content: 'Task 6 - Click here to edit.', marked: false},
      'item-7': { id: 'item-7', content: 'Task 7 - Click here to edit.', marked: false}
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do list 1',
        itemsIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7']
      },
      'column-2': {
        id: 'column-2',
        title: 'To do list 2',
        itemsIds: []
      },
      'column-3': {
        id: 'column-3',
        title: 'To do list 3',
        itemsIds: []
      },
      'column-4': {
        id: 'column-4',
        title: 'To do list 4',
        itemsIds: []
      }
    },
    columnsOrder: ['column-1', 'column-2', 'column-3', 'column-4']
  }