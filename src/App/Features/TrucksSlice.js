import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    truck_types: [],
}

const TrucksSlice = createSlice ({
    name: "TrucksSlice",
    initialState,
    reducers: {
        allTruckTypes: (state, action) => {
            state.truck_types = action.payload
        }
    }
})


export const { allTruckTypes } = TrucksSlice.actions


export default TrucksSlice.reducer