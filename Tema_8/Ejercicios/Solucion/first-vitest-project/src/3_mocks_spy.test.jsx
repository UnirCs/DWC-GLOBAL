// 3_mocks_spy.test.js
import { describe, it, expect, vi } from 'vitest'

// Objeto con método a espiar
const utils = {
    fetchData() {
        return 'real data'
    }
}

describe('utils.fetchData', () => {
    it('llama a fetchData y obtiene valor mockeado', () => {
        // Espiamos utils.fetchData y lo forzamos a devolver 'mocked'
        const spy = vi.spyOn(utils, 'fetchData').mockReturnValue('mocked')

        const result = utils.fetchData()

        expect(spy).toHaveBeenCalled()                // Verifica que se llamó al método
        expect(result).toBe('mocked')                 // Verifica retorno del mock

        spy.mockRestore()                             // Restaura la implementación original
    })
})
