import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,

    request: {
        isFetching: false,
        error: false
    },

    update: {
        isFetching: false,
        error: false
    }
}

const membershipSlice = createSlice({
    name: "membership",
    initialState,
    reducers: {
        //request
        requestBegin: (state) => {
            state.request.isFetching = true
        },

        requestSuccess: (state, action) => {
            state.request.isFetching = false
            state.currentUser = action.payload
            state.request.error = false
        },

        requestFailure: (state) => {
            state.request.isFetching = false
            state.request.error = true
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
        }
    }
})

export const slice = membershipSlice.actions
export default membershipSlice.reducer
