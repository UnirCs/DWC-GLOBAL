## Ejercicio 1 - Pruebas de de funciones con Vitest

En este ejercicio nos centraremos en escribir pruebas para funciones puras. Las funciones que vamos a probar son las siguientes:

```javascript
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
```

En este caso, crea el archivo `src/utils/factorial.test.js` y escribe tests que cubran:

Casos válidos:
- `factorial(0) = 1`
- `factorial(1) = 1`
- `factorial(5) = 120`

Casos de error

- `factorial(-1)` debe lanzar Error
- `factorial(2.5)` debe lanzar Error

Usa al menos:

- `describe` para agrupar.
- varios `it` para cada caso.
- `expect(...).toBe(...)` y `expect(() => ...).toThrow(...)`.

```javascript
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
```
En este caso, crea el archivo `src/utils/addAsync.test.js` y escribe tests que:

- Comprueben que `addAsync(2,3,50)` resuelve con 5.
- Controlen los temporizadores con `vi.useFakeTimers()` / `vi.advanceTimersByTime(50)`.
- Usen await o return de la promesa para esperar el resultado.

Incluye:
- `beforeEach` / `afterEach` para activar/restaurar fake timers.
- `expect(await addAsync(...)).toBe(...)` o bien `await expect(...).resolves.toBe(...)`.


```javascript
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
```

En este caso, crea el archivo `src/utils/delayedGreeting.test.js` y escribe tests que:

- Usen `vi.useFakeTimers()` para controlar el delay.
- Espíen el callback con `const cb = vi.fn()`.
- Llamen a `delayedGreeting('Ana', cb, 200)` y avancen el reloj `vi.advanceTimersByTime(200)`.
- Verifiquen que cb se llamó exactamente una vez con el saludo correcto:
  ```javascript
  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb).toHaveBeenCalledWith('¡Hola, Ana!');
  ```
- Restauren los timers con `vi.useRealTimers()` en `afterEach`.


## Ejercicio 2 - Pruebas de componentes funcionales usando React Testing Library

En este ejercicio, escribirás pruebas para varios componentes funcionales de la aplicación que se ha estado desarrollando.

El componente `Header` muestra el nombre del cine basado en los parámetros de la URL, el nombre del usuario si la sesión está activa, o un enlace "Iniciar sesión" si no hay un usuario conectado.
Escribe pruebas para asegurar lo siguiente:

1. **Nombre del cine desde los parámetros**: El nombre del cine (por ejemplo, "Madrid") se muestra en el encabezado cuando se pasa como un parámetro en la URL.
2. **Nombre del usuario**: Si un usuario ha iniciado sesión (proporcionado a través del `AuthContext`), su nombre (por ejemplo, "Juan") se muestra en el encabezado.
3. **Enlace de inicio de sesión**: Si no hay un usuario conectado, el encabezado muestra un enlace con el texto "Iniciar sesión".

`Pelicula` muestra información sobre una película, incluyendo su título, director, actores, categorías y sesiones disponibles.
Escribe pruebas para asegurar lo siguiente:

1. **Título como enlace**: El título de la película debe mostrarse como un enlace que lleva a la página de detalles de la película.
2. **Detalles de la película**: El componente debe mostrar el director, los actores y las categorías de la película.
3. **Sesiones disponibles**: Si el idioma de la sesión es "todos", deben mostrarse todas las sesiones. Si se selecciona un idioma específico, solo deben mostrarse las sesiones en ese idioma.
