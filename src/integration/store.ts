import { configureStore } from "@reduxjs/toolkit";
import fileTransferReducer from "./slices/fileTransferSlice";
import authReducer from "./slices/authSlice";
import {rootApiSlice} from "./api/rootApiSlice";

const store = configureStore({
     reducer:{
        [rootApiSlice.reducerPath]: rootApiSlice.reducer,
        fileTransfer:fileTransferReducer,
        auth: authReducer,
     },
     devTools:true,
     middleware: (gDM) =>gDM().concat(rootApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store    