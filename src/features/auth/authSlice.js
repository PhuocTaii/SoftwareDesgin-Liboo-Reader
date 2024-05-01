import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentAction: "Sign in",
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
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentAction: (state, action) => {
            state.currentAction = action.payload
        },

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
    }
})

export const slice = authSlice.actions
export default authSlice.reducer