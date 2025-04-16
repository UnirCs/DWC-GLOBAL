import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SessionLanguageSelector from './SessionLanguageSelector';
import { GlobalContext } from '../context/GlobalContext';

describe('SessionLanguageSelector', () => {
    it('muestra el valor inicial del contexto en el <select>', () => {
        const changeSessionLanguage = vi.fn();
        // Inicializamos sessionLanguage a "vose"
        render(
            <GlobalContext.Provider value={{ sessionLanguage: 'vose', changeSessionLanguage }}>
                <SessionLanguageSelector />
            </GlobalContext.Provider>
        );

        // El <select> debe tener el valor "vose"
        const select = screen.getByLabelText(/Filtrar sesiones por idioma:/i);
        expect(select.value).toBe('vose');

        // Debe mostrar todas las opciones
        expect(screen.getByRole('option', { name: /Todos/i })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: /Castellano/i })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: /VOSE/i })).toBeInTheDocument();
    });

    it('al cambiar la opción llama a changeSessionLanguage con el nuevo valor', () => {
        const changeSessionLanguage = vi.fn();
        render(
            <GlobalContext.Provider value={{ sessionLanguage: 'todos', changeSessionLanguage }}>
                <SessionLanguageSelector />
            </GlobalContext.Provider>
        );

        const select = screen.getByLabelText(/Filtrar sesiones por idioma:/i);
        // Simulamos que el usuario selecciona "castellano"
        act(() => {
            fireEvent.change(select, { target: { value: 'castellano' } });
        });

        expect(changeSessionLanguage).toHaveBeenCalledTimes(1);
        expect(changeSessionLanguage).toHaveBeenCalledWith('castellano');
    });
});
