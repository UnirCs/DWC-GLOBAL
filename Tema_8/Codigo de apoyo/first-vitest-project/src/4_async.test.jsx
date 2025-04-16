// 4_async.test.js
import { describe, it, expect } from 'vitest'

// Función que retorna promesa con delay
function fetchNumber() {
    return new Promise(resolve => {
        setTimeout(() => resolve(42), 100)
    })
}

describe('fetchNumber()', () => {
    it('resuelve con el número 42', async () => {
        const value = await fetchNumber()
        expect(value).toBe(42)
    })
})
