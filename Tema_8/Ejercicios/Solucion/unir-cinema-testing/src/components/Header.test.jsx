import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { GlobalContext } from '../context/GlobalContext.jsx';
import Header from './Header';

describe('Header Component', () => {
    it('muestra el cine recibido en los params', () => {
        render(
            <GlobalContext.Provider value={{ darkMode: false, toggleDarkMode: vi.fn() }}>
                <AuthContext.Provider value={{ user: null }}>
                    <MemoryRouter initialEntries={['/cines/madrid']}>
                        <Routes>
                            <Route path="/cines/:cinema" element={<Header />} />
                        </Routes>
                    </MemoryRouter>
                </AuthContext.Provider>
            </GlobalContext.Provider>
        );

        expect(screen.getByText(/Cine Entradas - Madrid/i)).toBeInTheDocument();
    });

    it('muestra el nombre del usuario si la sesión está iniciada', () => {
        render(
            <GlobalContext.Provider value={{ darkMode: false, toggleDarkMode: vi.fn() }}>
                <AuthContext.Provider value={{ user: { displayName: 'Juan' } }}>
                    <MemoryRouter initialEntries={['/cines/madrid']}>
                        <Routes>
                            <Route path="/cines/:cinema" element={<Header />} />
                        </Routes>
                    </MemoryRouter>
                </AuthContext.Provider>
            </GlobalContext.Provider>
        );

        expect(screen.getByText(/Sesión iniciada como Juan/i)).toBeInTheDocument();
    });

    it('muestra "Iniciar sesión" si no hay usuario en el contexto', () => {
        render(
            <GlobalContext.Provider value={{ darkMode: false, toggleDarkMode: vi.fn() }}>
                <AuthContext.Provider value={{ user: null }}>
                    <MemoryRouter initialEntries={['/cines/madrid']}>
                        <Routes>
                            <Route path="/cines/:cinema" element={<Header />} />
                        </Routes>
                    </MemoryRouter>
                </AuthContext.Provider>
            </GlobalContext.Provider>
        );

        expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
    });
});