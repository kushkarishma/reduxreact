import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./loginslice/authReducer";
import productReducer from "./productsslice/productReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
    },
});

export default store;
