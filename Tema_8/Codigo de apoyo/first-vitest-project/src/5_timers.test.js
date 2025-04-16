// 5_timers.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Función con callback tras 1s
function delayedSum(a, b, cb) {
    setTimeout(() => {
        cb(a + b)
    }, 1000)
}

describe('delayedSum()', () => {
    beforeEach(() => {
        vi.useFakeTimers()   // Activamos temporizadores falsos
    })
    afterEach(() => {
        vi.useRealTimers()   // Restauramos temporizadores reales
    })

    it('llama al callback con la suma tras 1 segundo', () => {
        const cb = vi.fn()
        delayedSum(2, 3, cb)

        vi.advanceTimersByTime(1000)    // Avanzamos el reloj virtual 1000 ms

        expect(cb).toHaveBeenCalledWith(5)
        expect(cb).toHaveBeenCalledTimes(1)
    })
})
