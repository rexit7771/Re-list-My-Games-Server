import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
const initialState = {
    data: {},
    loading: true,
    errors: null,
};

const token = localStorage.getItem('access_token');

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getProfileSuccess: (state, action) => {
            state.data = action.payload;
        },
        isError: (state, action) => {
            state.errors = action.payload
        },
        isLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { getProfileSuccess, isError, isLoading } = profileSlice.actions

export default profileSlice.reducer

export const fetchProfile = () => {
