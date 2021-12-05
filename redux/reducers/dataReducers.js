import * as types from "../types";

const initState = {
    categories: [],
    category: {},
    thread: {},
    comment: {
        edit: false,
        text: "",
        id: "",
    },
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

        case types.OPEN_EDIT:
            return {
                ...state,
                comment: {
                    edit: true,
                    text: action.payload.comment_text,
                    id: action.payload.comment_id,
                },
            };
        case types.CLOSE_EDIT:
            return {
                ...state,
                comment: {
                    edit: false,
                    text: "",
                    id: "",
                },
            };
        case types.CLEAR_CATEGORY_THREADS:
            return {
                ...state,
                category: {},
            };
        case types.CLEAR_THREAD_DETAILS:
            return {
                ...state,
                thread: {},
            };
        case types.CLEAR_CATEGORIES:
            return {
                ...state,
                categories: [],
            };

        default:
            return state;
    }
};

export default dataReducers;
