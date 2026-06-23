import { configureStore } from "@reduxjs/toolkit";
import { routeReducer } from "./store/reducer/routeReducer";

export const store = configureStore({
    reducer:{
        routes: routeReducer
    }
})