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

const userReducer = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_USERS:
            return {
                ...state,
                users: users,
            };
        default:
            return { ...state };
    }
};

export default userReducer;
