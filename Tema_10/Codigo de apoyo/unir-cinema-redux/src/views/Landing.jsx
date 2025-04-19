import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies} from '../features/movies/moviesSlice';
import Pelicula from '../components/Pelicula.jsx';
import SessionLanguageSelector from '../components/SessionLanguageSelector.jsx';
import './Landing.css';

const Landing = () => {
    const {cinema} = useParams();
    const dispatch = useDispatch();

    // Lectura del estado global de películas y estado de carga
    const movies = useSelector(state => state.movies.items);
    const loading = useSelector(state => state.movies.status === 'loading');

    // Al montar o cambiar cinema en la ruta, lanzamos la carga
    useEffect(() => {
        dispatch(fetchMovies(cinema));
    }, [cinema, dispatch]);

    if (loading) {
        return (
            <main className="landing">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="landing">
            {/* Selector de idioma de sesión */}
            <SessionLanguageSelector/>

            {/* Enlace al detalle del cine */}
            <div className="landing__cinema-detail-link">
                <Link to={`/cines/${cinema}/detalle`}>Ver Detalle del Cine</Link>
            </div>

            {/* Listado de películas */}
            {movies.map(movie => (
                <Pelicula
                    key={movie.id}
                    movie={movie}
                    cinema={cinema}
                />
            ))}
        </main>
    );
};

export default Landing;
