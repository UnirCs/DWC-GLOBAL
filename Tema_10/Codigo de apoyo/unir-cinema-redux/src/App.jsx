import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './views/HomePage.jsx';
import Landing from './views/Landing.jsx';
import MovieDetails from './views/MovieDetails.jsx';
import SeatSelection from './views/SeatSelection.jsx';
import AboutUs from './views/AboutUs.jsx';
import CinemaDetail from './views/CinemaDetail.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./views/Login.jsx";
import {useSelector} from "react-redux";

function AppContent() {
    const darkMode = useSelector(state => state.theme.darkMode);
    return (
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/sobre-nosotros" element={<AboutUs/>}/>
                <Route path="/cines/:cinema" element={<Landing/>}/>
                <Route path="/cines/:cinema/detalle" element={<CinemaDetail/>}/>
                <Route path="/cines/:cinema/movie/:movieId" element={<MovieDetails/>}/>
                <Route path="/cines/:cinema/movie/:movieId/session/:sessionHour" element={
                    <PrivateRoute>
                        <SeatSelection/>
                    </PrivateRoute>
                }/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

function App() {
    return (
        <AppContent/>
    );
}

export default App;
