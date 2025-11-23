import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        increase: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) item.quantity += 1;
        },

        decrease: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },

        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
    },
});

export const { addToCart, increase, decrease, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
