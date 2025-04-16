import { describe, it, expect } from 'vitest';
import { factorial } from './factorial';

describe('factorial()', () => {
    it('debe devolver 1 para 0', () => {
        expect(factorial(0)).toBe(1);
    });

    it('debe devolver 1 para 1', () => {
        expect(factorial(1)).toBe(1);
    });

    it('debe devolver 120 para 5', () => {
        expect(factorial(5)).toBe(120);
    });

    it('lanza error si n es negativo', () => {
        expect(() => factorial(-1)).toThrow('El argumento debe ser un entero no negativo');
    });

    it('lanza error si n no es entero', () => {
        expect(() => factorial(2.5)).toThrow('El argumento debe ser un entero no negativo');
    });
});
