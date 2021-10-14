import * as types from "../types";

const initState = {
    categories: [],
    category: {},
    thread: {},
};

const dataReducers = (state = initState, action) => {
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

        case types.GET_THREAD_DETAILS:
            return {
                ...state,
                thread: {
                    ...action.payload.thread,
                    comments: action.payload.comments,
                },
            };

        default:
            return state;
    }
};

export default dataReducers;
