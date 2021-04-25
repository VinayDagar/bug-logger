import { LOGIN, LOGOUT, UPDATE_USER,MESSAGE_RECIEVED } from './types';
import secureStorage from "../../services/secureStorage";

const initialState = {
    user: {},
    isAuthenticated: false,
    isMessageRecieved: false
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
        case MESSAGE_RECIEVED: {
            return {
                ...state,
                isMessageRecieved: true,
            };
        }
        default: return state;
    }
};
