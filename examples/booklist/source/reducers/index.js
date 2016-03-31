const initialState = [
  {
    id: '1',
    title: 'ReactJS for dummies',
    description: 'Great book to start learning React.',
    count: 2,
  },
  {
    id: '2',
    title: 'JavaScript to the rescue',
    description: 'Want to know more advanced stuff about JS, must read ;)!',
    count: 3,
  },
  {
    id: '3',
    title: 'NodeJS for the win',
    description: 'Everything about NodeJS.',
    count: 4,
  },
];

const books = (state = {
  items: initialState,
}, action) => {
  switch (action.type) {
    case 'ADD_COUNT': {
      const newItems = state.items.map(item => {
        let newCount = item.count;

        if (item.id === action.item.id) {
          newCount++;
        }

        return Object.assign(item, { count: newCount });
      });

      return Object.assign({}, state.items, {
        items: newItems,
      });
    }
    default:
      return state;
  }
};

export default { books };
