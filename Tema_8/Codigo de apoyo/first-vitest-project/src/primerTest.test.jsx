import { describe, it, expect } from 'vitest';

function add(a, b) { return a + b; }

describe('add()', () => {
    it('suma dos números', () => {
        expect(add(2, 3)).toBe(5);
    });
});
