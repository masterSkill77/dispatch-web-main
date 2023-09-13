import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    goods_types: [],
}

const GoodsSlice = createSlice ({
    name: "GoodsSlice",
    initialState,
    reducers: {
        allGoodTypes: (state, action) => {
            state.goods_types = action.payload
        }
    }
})


export const { allGoodTypes } = GoodsSlice.actions


export default GoodsSlice.reducer