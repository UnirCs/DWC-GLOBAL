import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { users } from '../../data/usersData';

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
        await new Promise(r => setTimeout(r, 1000));
        const found = users.find(u => u.username===username && u.password===password);
        if (!found) throw new Error('Credenciales inválidas');
        return found;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, status: 'idle', error: null },
    reducers: { logout: state => { state.user=null; state.status='idle'; } },
    extraReducers: builder => {
        builder
            .addCase(login.pending,  state => { state.status='loading'; state.error=null; })
            .addCase(login.fulfilled,(state, action) => { state.status='succeeded'; state.user=action.payload; })
            .addCase(login.rejected, (state, action) => { state.status='failed'; state.error=action.error.message; });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
