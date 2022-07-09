import React, { useReducer, useContext, useEffect } from "react";
import reducer from './reducer'
import axios from 'axios';
import jwt from 'jsonwebtoken';

import {
    CLEAR_ALERT,
    REGISTER_USER_ERROR,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    USER_DETAILS_BEGIN,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_ERROR
} from "./actions";

const token = localStorage.getItem('x-authorization')

const initalState = {
    isLoading: false,
    showAlert: true,
    alertText: '',
    alertType: '',
    user: null,
    token: null,
    showSideBar: false,
}

const appContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState)

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = (token, user) => {
        localStorage.setItem('x-authorization', token)
        localStorage.setItem('user', user)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('x-authorization')
        localStorage.removeItem('user')
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
            const { token } = response.data.token
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { token }
            })
            const loginToken = response.data.token
            const decode = jwt.decode(loginToken)
            const user = JSON.stringify(decode)
            addUserToLocalStorage(loginToken, user)

            window.location = '/user-details';

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

    const userDetails = async (userDetailsData) => {
        dispatch({ type: USER_DETAILS_BEGIN })
        try {
            const response = await axios.post('/api/v1/user-details/', userDetailsData, {
                headers: {
                    'x-authorization': token,
                    'Content-Type': 'multipart/form-data',
                }
            })
            const { msg } = "User Details Created Successfully!"
            console.log(response.data)
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: { msg }
            })

            window.location = '/profile';

        } catch (err) {
            console.log(err.response)
            if (!err.response.data.msg) {
                dispatch({
                    type: USER_DETAILS_ERROR,
                    payload: { msg: err.response.data }
                })
            } else {
                dispatch({
                    type: USER_DETAILS_ERROR,
                    payload: { msg: err.response.data.msg }
                })
            }
        }
        clearAlert()
    }

    const toggleSideBar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    const logOutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }


    return (
        <appContext.Provider value={{
            ...state,
            registerUser,
            loginUser,
            userDetails,
            toggleSideBar,
            logOutUser,
        }}>
            {children}
        </appContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(appContext)
}

export { AppProvider, initalState, useAppContext }