import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/movies/moviesSlice';
import './MovieDetails.css';

const MovieDetails = () => {
    const { cinema, movieId } = useParams();
    const dispatch = useDispatch();

    // Leer estado de películas y de carga desde Redux
    const movies  = useSelector(state => state.movies.items);
    const loading = useSelector(state => state.movies.status === 'loading');

    // Leer idioma de sesión del store
    const sessionLanguage = useSelector(state => state.sessionLanguage);

    // Al montar o cuando cambie 'cinema', recargar películas
    useEffect(() => {
        dispatch(fetchMovies(cinema));
    }, [cinema, dispatch]);

    if (loading) {
        return (
            <div className="movie-details">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando...</p>
                </div>
            </div>
        );
    }

    const movie = movies.find(m => m.id.toString() === movieId);
    if (!movie) {
        return (
            <div className="movie-details">
                <p>Película no encontrada.</p>
            </div>
        );
    }

    const filteredSessions = sessionLanguage === 'todos'
        ? movie.sessions
        : movie.sessions.filter(s => s.language === sessionLanguage);

    return (
        <div className="movie-details">
            <h2 className="movie-details__title">{movie.name}</h2>

            <div className="movie-details__trailer">
                <iframe
                    width="100%"
                    height="360"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            <div className="movie-details__info">
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Actores:</strong> {movie.actors.join(', ')}</p>
                <p><strong>Categorías:</strong> {movie.categories.join(', ')}</p>
            </div>

            <div className="movie-details__sessions">
                {filteredSessions.map((session, idx) => (
                    <Link
                        key={idx}
                        to={`/cines/${cinema}/movie/${movie.id}/session/${encodeURIComponent(session.hour)}`}
                    >
                        <button className="movie-details__session-button">
                            {session.hour} ({session.language})
                        </button>
                    </Link>
                ))}
            </div>

            <div className="movie-details__back">
                <Link to={`/cines/${cinema}`}>
                    <button>Volver a la lista</button>
                </Link>
            </div>
        </div>
    );
};

export default MovieDetails;
