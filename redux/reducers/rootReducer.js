import { combineReducers } from "redux";

import snackBarReducers from "./snackBarReducers";
import userReducers from "./userReducers";
import dataReducers from "./dataReducers";

const rootReducer = combineReducers({
    snackbar: snackBarReducers,
    userReducers,
    dataReducers,
});

export default rootReducer;
