import React from 'react';
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../context/AuthContext.jsx';

// 1) Mock de react‑router-dom para interceptar useNavigate/useLocation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ state: { from: '/protected' } })
    };
});

// 2) Mock de nuestro hook useLogin
const mockUseLogin = vi.fn();
vi.mock('../hooks/useLogin.jsx', () => ({
    default: () => ({ login: mockUseLogin, loading: false, error: null })
}));

describe('Login Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza inputs y botón correctamente', () => {
        render(
            <AuthContext.Provider value={{ setUser: vi.fn() }}>
                <MemoryRouter><Login /></MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.getByLabelText: busca un input asociado a una etiqueta
        const userInput = screen.getByLabelText(/Nombre de usuario/i);
        const passInput = screen.getByLabelText(/Contraseña/i);

        // screen.getByRole: busca elementos por su rol ARIA
        const button = screen.getByRole('button', { name: /Iniciar Sesión/i });

        expect(userInput).toBeInTheDocument();
        expect(passInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    it('al enviar el formulario con éxito llama a login, setUser y navigate', async () => {
        const fakeUser = { displayName: 'Juan Pérez' };
        mockUseLogin.mockResolvedValueOnce(fakeUser);
        const setUser = vi.fn();

        render(
            <AuthContext.Provider value={{ setUser }}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // fireEvent.change: simula escritura en un input
        fireEvent.change(screen.getByLabelText(/Nombre de usuario/i), { target: { value: 'user1' } });
        fireEvent.change(screen.getByLabelText(/Contraseña/i),    { target: { value: 'pass1' } });

        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        // waitFor: espera a que cambie algo en el DOM o en mocks
        await waitFor(() => {
            expect(mockUseLogin).toHaveBeenCalledWith('user1', 'pass1');
            expect(setUser).toHaveBeenCalledWith(fakeUser);
            // toHaveBeenCalledWith: asegura que la función fue llamada con esos argumentos
            expect(mockNavigate).toHaveBeenCalledWith('/protected', { replace: true });
        });
    });

    vi.mock('../hooks/useLogin.jsx', () => ({
        default: () => ({ login: mockUseLogin, loading: false, error: 'Credenciales inválidas' })
    }));

    it('muestra mensaje de error cuando el login falla', async () => {
        const setUser = vi.fn();

        render(
            <AuthContext.Provider value={{ setUser }}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        await act(async () => {
            // Simula la entrada de datos en los inputs
            fireEvent.change(screen.getByLabelText(/Nombre de usuario/i), { target: { value: 'usuario_incorrecto' } });
            fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'contrasena_incorrecta' } });
            // Simula el envío del formulario
            fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
        });

        // Comprueba que el mensaje de error aparece en la pantalla
        const errorMsg = screen.getByText(/Credenciales inválidas/i);
        expect(errorMsg).toBeInTheDocument();
        expect(mockUseLogin).toHaveBeenCalledWith('usuario_incorrecto', 'contrasena_incorrecta');
        expect(mockUseLogin).toHaveBeenCalledTimes(1);
        expect(setUser).toHaveBeenCalledWith(undefined);
    });
});
