import { createSlice } from '@reduxjs/toolkit'

const sessionLanguageSlice = createSlice({
    name: 'sessionLanguage',
    initialState: 'todos',
    reducers: {
        setSessionLanguage(state, action) {
            return action.payload;
        }
    }
});

export const { setSessionLanguage } = sessionLanguageSlice.actions;
export default sessionLanguageSlice.reducer;
