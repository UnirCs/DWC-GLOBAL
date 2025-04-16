import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { delayedGreeting } from './delayedGreeting';

describe('delayedGreeting()', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    it('llama al callback con saludo correcto tras 200ms', () => {
        const cb = vi.fn();

        delayedGreeting('Ana', cb, 200);

        // Aún no debe haberse llamado
        expect(cb).not.toHaveBeenCalled();

        // Avanzamos 200ms
        vi.advanceTimersByTime(200);

        // Ahora sí
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith('¡Hola, Ana!');
    });

    it('usa delay por defecto de 500ms si no se pasa delayMs', () => {
        const cb = vi.fn();

        delayedGreeting('Luis', cb);
        vi.advanceTimersByTime(500);

        expect(cb).toHaveBeenCalledOnce();
        expect(cb).toHaveBeenCalledWith('¡Hola, Luis!');
    });
});
