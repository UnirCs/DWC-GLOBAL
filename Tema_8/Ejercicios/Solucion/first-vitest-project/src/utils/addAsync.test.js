import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { addAsync } from './addAsync';

describe('addAsync()', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('resuelve con 5 tras 50ms', async () => {
        const promise = addAsync(2, 3, 50);

        // Avanzamos el temporizador virtual 50ms
        vi.advanceTimersByTime(50);

        // Espera a que la promesa se resuelva
        await expect(promise).resolves.toBe(5);
    });

    it('resuelve con 10 usando valor por defecto de delay', async () => {
        const promise = addAsync(4, 6); // delayMs = 100

        vi.advanceTimersByTime(100);
        await expect(promise).resolves.toBe(10);
    });
});
