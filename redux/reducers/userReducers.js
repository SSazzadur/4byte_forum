import * as types from "../types";

const users = [
    {
        name: "John",
        age: 25,
        phone: "123456789",
    },
    {
        name: "Jenny",
        age: 26,
        phone: "123456789",
    },
];

const initState = {
    currentUser: {
        isAuth: false,
    },
    isFormCompleted: false,
};

const userReducers = (state = initState, action) => {
    switch (action.type) {
        case types.CHECK_USER_AUTH:
            return {
                ...state,
                currentUser: action.payload,
            };

        case types.IS_FORM_COMPLETED:
            return {
                ...state,
                isFormCompleted: action.payload,
            };
        default:
            return { ...state };
    }
};

export default userReducers;
