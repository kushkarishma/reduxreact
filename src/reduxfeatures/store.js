// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import authReducer from "./loginslice/authReducer";
import productReducer from "./productsslice/productReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
});


const persistConfig = {
    key: "root",
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


const persistor = persistStore(store);

export { store, persistor };

