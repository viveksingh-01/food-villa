import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(e => e?.card?.info.id === action.payload);
      state.items.splice(itemIndex, 1);
    }
  }
});

export const { addItem, removeItem } = actions;

export default reducer;
