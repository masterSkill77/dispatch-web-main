import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    models: {
        quotation_model: false,
    }
}
const UIControllerSlice = createSlice ({
    name: "UIController",
    initialState,
    reducers: {
        quotation_model: (state) => {
            state.models.quotation_model = !state.models.quotation_model
        }
    }
})

export const { quotation_model } = UIControllerSlice.actions

export default UIControllerSlice.reducer