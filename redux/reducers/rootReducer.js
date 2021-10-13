import { combineReducers } from "redux";

import snackBarReducers from "./snackBarReducers";
import userReducers from "./userReducers";
import categoryReducers from "./categoryReducers";

const rootReducer = combineReducers({
    snackbar: snackBarReducers,
    userReducers,
    categoryReducers,
});

export default rootReducer;
