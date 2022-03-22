import * as action from './actionTypes';

const initState = {
    isLogin: false,
    username: "Unregistered",
    password: "827ccb0eea8a706c4c34a16891f84e7b",
};

export default function reducer(state = initState, { type, payload }) {
    switch (type) {
        case action.LOGIN:
            return { ...state, isLogin: true, username: payload.username };
        case action.LOGOUT:
            localStorage.removeItem("access_token");
            return { ...state, isLogin: false, username: "Unregistered" }
        case action.UPDATE:
            return { ...state, changes: Math.random() }
        default:
            return state;
    }
}