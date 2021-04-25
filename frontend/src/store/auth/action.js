import { LOGIN, LOGOUT, MESSAGE_RECIEVED, UPDATE_USER } from './types';

export const login = (payload) => (dispatch) => {
    dispatch({
        type: LOGIN,
        payload,
    });
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};

export const updateUser = (payload) => (dispatch) => {
    dispatch({
        type: UPDATE_USER,
        payload
    });
};

export const messageRecieved = (payload) => (dispatch) => {
    console.log("dasdasd")
    dispatch({
        type: MESSAGE_RECIEVED,
    });
};
