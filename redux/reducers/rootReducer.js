import { combineReducers } from "redux";
import userReducers from "./userReducers";
import snackBarReducers from "./snackBarReducers";

const rootReducer = combineReducers({
    snackbar: snackBarReducers,
    userReducers,
});

export default rootReducer;
