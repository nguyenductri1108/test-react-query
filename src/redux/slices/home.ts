import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    count: number;
    isLoading: boolean;
    err: boolean;
}

const initialState: InitialState = {
    count: 0,
    isLoading: false,
    err: false,
};

const homeSlice = createSlice({
    initialState,
    name: "count",
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        addByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const HomeAction = homeSlice.actions;
export default homeSlice.reducer;
