/* eslint-disable @typescript-eslint/ban-types */
import phin from "phin";
const delay = 1000;

/**
 * delay stuff
 * @param ms 
 * @returns Promise<T>
 */
export async function rateLimit(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Call api and return the response
 * @param {string} url some endpoint
 * @param {object} auth authorization 
 * @param {string} method GET, POST, PUT, DELETE
 * @param {object} data data to send
 * @returns {Promise<object>}
 */
export async function request(url: string, auth: object, method: string, data?: object) {
  await rateLimit(delay);
  return await phin({
    method: method,
    url: url,
    headers: auth,
    parse: "json",
    data: data
  });
}

/**
 * loop with interval
 * @param {Function} callback
 * @param {number} delay
 * @returns {Promise<void>}
 */
export async function loopInterval(callback: Function, delay: number) {
  await callback();
  return setInterval(callback, delay);
}

/**
 * loop with count
 * @param callback 
 * @param delay 
 * @param times 
 * @returns {Promise<void>}
 */
export async function loopCount(callback: Function, delay: number, times: number) {
  for (let i = 0; i < times; i++) {
    await callback();
    await rateLimit(delay);
  }
}

export { delay };