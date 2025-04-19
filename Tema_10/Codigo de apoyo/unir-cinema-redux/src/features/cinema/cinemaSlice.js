import { createSlice } from '@reduxjs/toolkit'

const cinemaSlice = createSlice({
    name: 'cinema',
    initialState: 'madrid',
    reducers: {
        setCinema(state, action) {
            return action.payload;
        }
    }
});

export const { setCinema } = cinemaSlice.actions;
export default cinemaSlice.reducer;
