import { createAsyncThunk } from "@reduxjs/toolkit";
import { postBackendData } from "../../api/api-service";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await postBackendData("auth/login", credentials);

            if (res && res.token) {
                const user = { username: res.username, role: res.role };
                return { token: res.token, user };
            } else {
                return rejectWithValue(res?.message || "Login failed");
            }
        } catch (error) {
            return rejectWithValue(error.message || "Server error");
        }
    }
);
