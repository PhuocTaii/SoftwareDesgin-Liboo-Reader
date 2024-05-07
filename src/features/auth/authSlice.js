import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser } from '../profile/profileApi'

const initialState = {
    currentUser: null,

    signin: {
        isFetching: false,
        error: false
    },

    register: {
        isFetching: false,
        error: false
    },

    logout:{
        isFetching: false,
        error: false,
    },

    update: {
        isFetching: false,
        error: false
    },

    getCurrentUser: {
        isFetching: false,
        error: false
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //Sign in
        signInBegin: (state) => {
            state.signin.isFetching = true
        },

        signInSuccess: (state, action) => {
            state.signin.isFetching = false
            state.currentUser = action.payload
            state.signin.error = false
        },

        signInFailure: (state) => {
            state.signin.isFetching = false
            state.signin.error = true
        },

        //Register
        registerBegin: (state) => {
            state.register.isFetching = true
        },
        
        registerSuccess: (state, action) => {
            state.register.isFetching = false
            state.currentUser = action.payload
            state.register.error = false
        },

        registerFailure: (state) => {
            state.register.isFetching = false
            state.register.error = true
        },

        //Logout
        logoutBegin: (state) => {
            state.logout.isFetching = true
        },

        logoutSuccess: (state) => {
            state.signin.isFetching = false
            state.currentUser = null
            state.signin.error = false
        },

        logoutFailure: (state) => {
            state.logout.isFetching = false
            state.logout.error = true
        },

        //Update
        updateBegin: (state) => {
            state.update.isFetching = true
        },

        updateSuccess: (state, action) => {
            state.update.isFetching = false
            state.currentUser.user = action.payload
            state.update.error = false
        },

        updateFailure: (state) => {
            state.update.isFetching = false
            state.update.error = true
        },

        //GetCurrentUser
        getCurrentUserBegin: (state) => {
            state.getCurrentUser.isFetching = true
        },

        getCurrentUserSuccess: (state, action) => {
            state.getCurrentUser.isFetching = false
            state.currentUser.user = action.payload
            state.getCurrentUser.error = false
        },

        getCurrentUserFailure: (state) => {
            state.getCurrentUser.isFetching = false
            state.getCurrentUser.error = true
        }
    }
})

export const slice = authSlice.actions
export default authSlice.reducer