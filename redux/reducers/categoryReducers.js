import * as types from "../types";

const initState = {
    categories: [],
    category: {},
};

const categoryReducers = (state = initState, action) => {
    switch (action.type) {
        case types.FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        default:
            return state;
    }
};

export default categoryReducers;
