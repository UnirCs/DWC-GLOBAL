// src/utils/delayedGreeting.js

/**
 * Tras delayMs ms, llama al callback con un saludo.
 * @param {string} name
 * @param {function(string):void} callback
 * @param {number} delayMs
 */
export function delayedGreeting(name, callback, delayMs = 500) {
    setTimeout(() => {
        callback(`¡Hola, ${name}!`);
    }, delayMs);
}
