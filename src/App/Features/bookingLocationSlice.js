import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addresses: null
}
const BookingLocationSlice = createSlice ({
    name: 'BookingLocation',
    initialState,
    reducers: {
        getLocations: ( state ) => state.addresses,
        setLocations: ( state, action ) => {
            state.addresses = action.payload
        } 
    }
})

export const { getLocations, setLocations } = BookingLocationSlice.actions

export default BookingLocationSlice.reducer