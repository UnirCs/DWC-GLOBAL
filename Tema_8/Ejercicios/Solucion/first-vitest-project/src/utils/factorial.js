// src/utils/factorial.js

/**
 * Calcula el factorial de un número no negativo.
 * @param {number} n – debe ser entero ≥ 0
 * @returns {number} factorial de n
 * @throws {Error} si n es negativo o no es entero
 */
export function factorial(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('El argumento debe ser un entero no negativo');
    }
    if (n === 0) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}