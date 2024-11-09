import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./games";


export const store = configureStore({
    reducer: {
        game: gameReducer,
    },
});
