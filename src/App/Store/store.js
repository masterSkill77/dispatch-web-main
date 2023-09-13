import { configureStore } from "@reduxjs/toolkit";
import bookingLocationReducer from "../Features/bookingLocationSlice";
import UICoontroller from "../Features/UICoontroller";
import TrucksReducer from "../Features/TrucksSlice";
import GoodReducer from "../Features/goodsSlice";


const store = configureStore ({
    reducer: {
        BookingLocation: bookingLocationReducer,
        UIController: UICoontroller,
        Trucks: TrucksReducer,
        Goods: GoodReducer,
    }
})

export default store