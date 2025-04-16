// 2_state.test.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

let counter = 0

describe('contador mutable', () => {
    beforeEach(() => {
        // Se ejecuta antes de cada test en este bloque
        counter = 0
    })

    afterEach(() => {
        // Se ejecuta tras cada test (limpieza, logs, etc.)
        // aquí no hacemos nada, pero podríamos resetear mocks, cerrar conexiones,…
    })

    it('debe empezar en cero', () => {
        expect(counter).toBe(0)
    })

    it('debe incrementarse en uno', () => {
        counter++
        expect(counter).toBe(1)
    })
})
