import { getBackendData } from "../../api/api-service";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const result = await getBackendData("products");
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
