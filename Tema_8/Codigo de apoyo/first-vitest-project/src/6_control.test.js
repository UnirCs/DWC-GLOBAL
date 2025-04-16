// 6_control.test.js
import { describe, it, test, expect } from 'vitest'

describe('control de tests', () => {
    it.skip('este test se salta', () => {
        expect(true).toBe(false)
    })

    it.only('solo este test se ejecuta dentro del describe', () => {
        expect(1 + 1).toBe(2)
    })

    test.todo('implementar este test más adelante')
})
