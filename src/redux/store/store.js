// import { configureStore,createStore } from "@reduxjs/toolkit";
// import counterReducer from "../reducer/counterReducer";
//
// const store = createStore(counterReducer);
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducer/counterReducer";
import todoReducer from "../reducer/todoReducer";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
        // Add other reducers here if needed
    },
});

export default store;