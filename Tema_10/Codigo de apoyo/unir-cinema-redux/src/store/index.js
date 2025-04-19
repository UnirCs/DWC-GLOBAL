import { configureStore } from '@reduxjs/toolkit'
import themeReducer           from '../features/theme/themeSlice.js'
import cinemaReducer          from '../features/cinema/cinemaSlice'
import sessionLanguageReducer from '../features/sessions/sessionLanguageSlice'
import authReducer            from '../features/auth/authSlice'
import moviesReducer          from '../features/movies/moviesSlice'

export const store = configureStore({
    reducer: {
        theme:            themeReducer,
        cinema:           cinemaReducer,
        sessionLanguage:  sessionLanguageReducer,
        auth:             authReducer,
        movies:           moviesReducer
    }
});
