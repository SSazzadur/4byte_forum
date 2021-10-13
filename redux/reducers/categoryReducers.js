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

        case types.GET_CATEGORY_THREADS:
            return {
                ...state,
                category: {
                    ...action.payload.category,
                    threads: action.payload.threads,
                },
            };

        default:
            return state;
    }
};

export default categoryReducers;
