import { configureStore } from "@reduxjs/toolkit";
import { characterReducer } from "./store/reducer/CharacterReducer";

export const store = configureStore({
    reducer:{
        characters : characterReducer
    }
})