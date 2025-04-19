import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {movies as moviesDataMadrid}  from '../../data/moviesDataMadrid';
import {movies as moviesDataBarcelona}  from '../../data/moviesDataBarcelona';
import {movies as moviesDataValencia}  from '../../data/moviesDataValencia';
import {movies as moviesDataSevilla}  from '../../data/moviesDataSevilla';

export const fetchMovies = createAsyncThunk(
    'movies/fetch',
    async (cinema) => {
        try {
            await new Promise(r => setTimeout(r, 2000));
            const { data } = await axios.get(`https://unir-cinema.net/movies?cinema=${cinema}`);
            return data;
        } catch {
            // fallback local
            switch(cinema) {
                case 'barcelona': return moviesDataBarcelona;
                case 'valencia':  return moviesDataValencia;
                case 'sevilla':   return moviesDataSevilla;
                default:          return moviesDataMadrid;
            }
        }
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { items: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMovies.pending,   state => { state.status='loading'; })
            .addCase(fetchMovies.fulfilled, (state, action) => { state.status='succeeded'; state.items=action.payload; })
            .addCase(fetchMovies.rejected,  state => { state.status='failed'; });
    }
});

export default moviesSlice.reducer;
