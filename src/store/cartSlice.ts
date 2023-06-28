import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface CartState {
  items: {
    [key: string]: {
      quantity: number;
    };
  };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    receiveCart(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items;
    },
    incrementQty(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity++;
      }
    },
    decrementQty(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity--;
      }
    },
    addToCart(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity++;
      } else {
        state.items[id] = { quantity: 1 };
      }
    },
    addToCartByQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const { id, qty } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += qty;
      } else {
        state.items[id] = { quantity: qty };
      }
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      delete state.items[id];
    },
  },
});

export const {
  addToCart,
  addToCartByQty,
  receiveCart,
  removeFromCart,
  decrementQty,
  incrementQty,
} = cartSlice.actions;

export const getMemoizedCartItemsQty = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    return Object.values(items).reduce((acc, item) => acc + item.quantity, 0);
  }
);

export const getMemoizedCartItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    return items;
  }
);

export default cartSlice.reducer;
