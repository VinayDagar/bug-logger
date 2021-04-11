import { LOGIN, LOGOUT, UPDATE_USER } from './types';

export const login = (payload) => (dispatch) => {
    dispatch({
        type: LOGIN,
        payload,
    })
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    })
};

export const updateUser = (payload) => (dispatch) => {
    dispatch({
        type: UPDATE_USER,
        payload
    })
};
