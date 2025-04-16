import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext.jsx';
import Pelicula from './Pelicula';

describe('Pelicula Component', () => {
    const mockMovie = {
        id: 1,
        name: 'Inception',
        director: 'Christopher Nolan',
        actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
        categories: 'Sci-Fi, Thriller',
        sessions: [
            { hour: '10:00', language: 'es' },
            { hour: '12:00', language: 'en' },
        ],
    };

    const mockCinema = 'madrid';

    it('muestra el título de la película como un enlace', () => {
        render(
            <GlobalContext.Provider value={{ sessionLanguage: 'todos' }}>
                <MemoryRouter>
                    <Pelicula movie={mockMovie} cinema={mockCinema} />
                </MemoryRouter>
            </GlobalContext.Provider>
        );

        const titleLink = screen.getByRole('link', { name: /Inception/i });
        expect(titleLink).toBeInTheDocument();
        expect(titleLink).toHaveAttribute('href', '/cines/madrid/movie/1');
    });

    it('muestra los detalles de la película', () => {
        render(
            <GlobalContext.Provider value={{ sessionLanguage: 'todos' }}>
                <MemoryRouter>
                    <Pelicula movie={mockMovie} cinema={mockCinema} />
                </MemoryRouter>
            </GlobalContext.Provider>
        );

        expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();
        expect(screen.getByText(/Leonardo DiCaprio, Joseph Gordon-Levitt/i)).toBeInTheDocument();
        expect(screen.getByText(/Thriller/i)).toBeInTheDocument();
    });

    it('muestra todas las sesiones si el idioma es "todos"', () => {
        render(
            <GlobalContext.Provider value={{ sessionLanguage: 'todos' }}>
                <MemoryRouter>
                    <Pelicula movie={mockMovie} cinema={mockCinema} />
                </MemoryRouter>
            </GlobalContext.Provider>
        );

        expect(screen.getByText(/10:00 \(es\)/i)).toBeInTheDocument();
        expect(screen.getByText(/12:00 \(en\)/i)).toBeInTheDocument();
    });

    it('filtra las sesiones por idioma si no es "todos"', () => {
        render(
            <GlobalContext.Provider value={{ sessionLanguage: 'es' }}>
                <MemoryRouter>
                    <Pelicula movie={mockMovie} cinema={mockCinema} />
                </MemoryRouter>
            </GlobalContext.Provider>
        );

        expect(screen.getByText(/10:00 \(es\)/i)).toBeInTheDocument();
        expect(screen.queryByText(/12:00 \(en\)/i)).not.toBeInTheDocument();
    });
});