// src/utils/addAsync.js

/**
 * Devuelve una promesa que resuelve con la suma de a + b tras un delay.
 * @param {number} a
 * @param {number} b
 * @param {number} delayMs
 * @returns {Promise<number>}
 */
export function addAsync(a, b, delayMs = 100) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, delayMs);
    });
}
