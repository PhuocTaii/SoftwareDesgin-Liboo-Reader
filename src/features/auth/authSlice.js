import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentAction: "Sign in",
    signin: {
        currentUser: null,
        isFethching: false,
        error: false
    },

    register: {
        currentUser: null,
        isFethching: false,
        error: false
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
            state.signin.isFethching = true
        },

        signInSuccess: (state, action) => {
            state.signin.isFethching = false
            state.signin.currentUser = action.payload
            state.signin.error = false
        },

        signInFailure: (state) => {
            state.signin.isFethching = false
            state.signin.error = true
        },

        //Register
        registerBegin: (state) => {
            state.register.isFethching = true
        },
        
        registerSuccess: (state, action) => {
            state.register.isFethching = false
            state.register.currentUser = action.payload
            state.register.error = false
        },

        registerFailure: (state) => {
            state.register.isFethching = false
            state.register.error = true
        }
    }
})

export const slice = authSlice.actions
export default authSlice.reducer