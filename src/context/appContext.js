import React from 'react';
import { useReducer, useContext } from "react";
import reducer from './reducer'
import { DISPLAY_ALERT } from "./actions";

const initalState = {
    isLoading: false,
    showAlert: true,
    alertText: '',
    alertType: ''
}

const appContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
    }

    return (
        <appContext.Provider value={{ ...state, displayAlert }}>
            {children}
        </appContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(appContext)
}

export { AppProvider, initalState, useAppContext }