import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui-slice";
import authReducer from "./auth-slice";
import mailReducer from "./mail-slice";

const store = configureStore({
  reducer: { ui: uiReducer, auth: authReducer, mail: mailReducer },
});

export default store;
