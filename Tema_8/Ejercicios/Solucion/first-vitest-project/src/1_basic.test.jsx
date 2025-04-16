// 1_basic.test.js
import { describe, it, expect } from 'vitest';

// Función sencilla a testear
function add(a, b) {
    return a + b
}

describe('add()', () => {
    it('debe sumar dos números correctamente', () => {
        expect(add(1, 2)).toBe(3)
        expect(add(-1, 1)).toBe(0)
    })
})
