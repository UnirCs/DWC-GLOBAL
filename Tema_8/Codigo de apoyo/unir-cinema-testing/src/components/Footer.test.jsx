import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer component', () => {
    it('renderiza el elemento <footer> con el texto correcto', () => {
        render(<Footer />);
        // Busca el elemento footer (role="contentinfo")
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();

        // Comprueba que contiene el texto exacto
        expect(footer).toHaveTextContent(
            /©\s*2025 Cine Entradas\. Todos los derechos reservados\./
        );
    });
});
