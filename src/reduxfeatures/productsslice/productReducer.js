
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./product-action";

const initialState = {
    product: [],
    loading: false,
    error: null,
};


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.product = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },

});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
