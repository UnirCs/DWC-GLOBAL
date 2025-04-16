import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SeatSelection from './SeatSelection';

describe('SeatSelection Component', () => {
    const route = '/cines/madrid/movie/5/session/18:30';

    it('renderiza título e información basada en useParams', () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/cines/:cinema/movie/:movieId/session/:sessionHour" element={<SeatSelection />} />
                </Routes>
            </MemoryRouter>
        );

        // Encabezado
        expect(
            screen.getByRole('heading', { name: /Selecciona tus asientos/i })
        ).toBeInTheDocument();

        // Labels y valores por separado
        expect(screen.getByText('Cine:')).toBeInTheDocument();
        expect(screen.getByText('Madrid')).toBeInTheDocument();

        expect(screen.getByText('Pelicula ID:')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();

        expect(screen.getByText('Hora:')).toBeInTheDocument();
        expect(screen.getByText('18:30')).toBeInTheDocument();
    });

    it('muestra una cuadrícula 10x10 y permite seleccionar un asiento', () => {
        const { container } = render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/cines/:cinema/movie/:movieId/session/:sessionHour" element={<SeatSelection />} />
                </Routes>
            </MemoryRouter>
        );

        // container.getElementsByClassName devuelve un HTMLCollection
        const seats = container.getElementsByClassName('seat-selection__seat');
        // toHaveLength: matcher de expect para verificar tamaño de array/colección
        expect(seats).toHaveLength(100);

        const firstSeat = seats[0];
        // Comprueba que no tenga la clase de seleccionado
        expect(firstSeat.classList.contains('seat-selection__seat--selected')).toBe(false);

        // Simula clic en el asiento
        fireEvent.click(firstSeat);
        // Ahora debe tener la clase de seleccionado
        expect(firstSeat.classList.contains('seat-selection__seat--selected')).toBe(true);
    });
});
