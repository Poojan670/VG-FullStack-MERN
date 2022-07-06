import {
    CLEAR_ALERT,
    REGISTER_USER_ERROR,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from "./actions";

const reducer = (state, action) => {

    if (action.type === CLEAR_ALERT) {
        return {
            ...state, showAlert: false,
            alertType: '',
            alertText: ''
        }
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return {
            ...state, isLoading: true
        }
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.msg
        }
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state, isLoading: true
        }
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login Successful, Redirecting...'
        }
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer;