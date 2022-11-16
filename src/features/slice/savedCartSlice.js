import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('savedCart')
    ? JSON.parse(localStorage.getItem('savedCart'))
    : []

// slice untuk menyimpan barang-barang keranjang user
export const savedCartSlice = createSlice({
    name: "savedCart",
    initialState,
    reducers: {
        saveCart: (state, action) => {
            try {
                // console.log("STATE IN SLICE", state.item)
                // console.log("ACTION IN SLICE", action.payload)
                const result = state.find((item) => item.userId === action.payload.userId)
                if (result) {
                    // console.log("USER IS SAVED", result)
                    state.forEach((element, index) => {
                        if (element.userId === action.payload.userId) state[index] = action.payload
                    });
                } else {
                    // console.log("USER IS NOT SAVED", result)
                    state.push(action.payload);
                }
                // state.push(action.payload)
            } catch (e) {
                console.log("ERROR IN SAVED CART", e)
            }
        }
    },
});

export const { saveCart } = savedCartSlice.actions
export default savedCartSlice.reducer;