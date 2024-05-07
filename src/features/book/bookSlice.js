import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentBook: null,

    getBook: {
        isFetching: false,
        error: false,
    },

    getAllBooks: {
        isFetching: false,
        error: false,
    }
}

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        //
        getBookBegin: (state) => {
            state.getBook.isFetching = true
        },

        getBookSuccess: (state, action) => {
            state.getBook.isFetching = false
            state.currentBook = action.payload
            state.getBook.error = false
        },

        getBookFailure: (state) => {
            state.getBook.isFetching = false
            state.getBook.error = true
        },

        //Get all Books
        getAllBooksBegin: (state) => {
            state.getAllBooks.isFetching = true
        },
        
        getAllBooksSuccess: (state, action) => {
            state.getAllBooks.isFetching = false
            state.currentBook = action.payload
            state.getAllBooks.error = false
        },

        getAllBooksFailure: (state) => {
            state.getAllBooks.isFetching = false
            state.getAllBooks.error = true
        },

    }
})

export const slice = bookSlice.actions
export default bookSlice.reducer
