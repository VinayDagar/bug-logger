import { LOGIN, LOGOUT, UPDATE_USER } from './types';
import secureStorage from "../../services/secureStorage";

const initialState = {
    user: {},
    isAuthenticated: false
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case LOGIN: {
            localStorage.setItem('x-access-token', payload.token);
            secureStorage.setItem("user", JSON.stringify(payload.user));

            return {
                ...state,
                user: payload.user,
                isAuthenticated: true
            };
        }
        case LOGOUT: {
            localStorage.removeItem('x-access-token');
            secureStorage.removeItem('user');
            secureStorage.removeItem('state');

            return {
                ...initialState
            };
        }
        case UPDATE_USER: {
            return {
                ...state,
                user: payload,
                isAuthenticated: true
            };
        }
        default: return state;
    }
};
