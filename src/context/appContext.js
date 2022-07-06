import React, { useReducer, useContext, useEffect } from "react";
import reducer from './reducer'
import axios from 'axios';

import {
    CLEAR_ALERT,
    REGISTER_USER_ERROR,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from "./actions";

const token = localStorage.getItem('x-authorization')

const initalState = {
    isLoading: false,
    showAlert: true,
    alertText: '',
    alertType: '',
    user: null,
    token: token,
}

const appContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState)

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = (token) => {
        localStorage.setItem('x-authorization', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('x-authorization')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('/api/v1/users/', currentUser)
            const { msg } = response.data.msg
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { msg }
            })
        } catch (err) {
            if (!err.response.data.msg) {
                dispatch({
                    type: REGISTER_USER_ERROR,
                    payload: { msg: err.response.data }
                })
            } else {
                dispatch({
                    type: REGISTER_USER_ERROR,
                    payload: { msg: err.response.data.msg }
                })
            }
        }
        clearAlert();
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const response = await axios.post('/api/v1/login/', currentUser)
            console.log(response)
            const { token } = response.data.token
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { token }
            })
            addUserToLocalStorage(response.data.token)
            window.location = '/profile';

        } catch (err) {
            console.log(err.response.data)
            if (!err.response.data.msg) {
                dispatch({
                    type: LOGIN_USER_ERROR,
                    payload: { msg: err.response.data }
                })
            } else {
                dispatch({
                    type: LOGIN_USER_ERROR,
                    payload: { msg: err.response.data.msg }
                })
            }
        }
        clearAlert();
    }

    const userProfile = async (currentUser) => {
        try {
            const response = await axios.get('/api/v1/user-details/me', currentUser, {
                headers: {
                    'x-authorization': token
                }
            })
            console.log(response)
        } catch (err) {
            try {
                if (err.response.status === 403) {
                    const userDetailsData = await axios.post('/api/v1/user-details/', {
                        headers: {
                            'x-authorization': token
                        }
                    })
                } else {
                    console.log(err.response)
                }
            } catch (err) {
                console.log(err.response.data)
            }
        }
    }

    return (
        <appContext.Provider value={{ ...state, registerUser, loginUser, userProfile }}>
            {children}
        </appContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(appContext)
}

export { AppProvider, initalState, useAppContext }