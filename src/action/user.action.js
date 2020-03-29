import { SET_USER, LOGOUT_USER, SET_AUTH_TOKEN, REFRESH_USER } from "../constant/redux.constant";

export const setUserAction = user => ({
    type: SET_USER,
    user
})

export const logoutUserAction = () => ({
    type: LOGOUT_USER
})

export const setAuthTokenAction = (token) => ({
    type: SET_AUTH_TOKEN,
    token
})

export const refreshUser = () => ({
    type: REFRESH_USER
})