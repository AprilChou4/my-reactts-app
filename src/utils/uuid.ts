import generate from 'nanoid/generate';

const FIRST_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * 生成首字母必须为字母的随机ID字符串
 *
 * @requires 'nanoid/generate'
 *
 * @param {number} size - The number of symbols in ID.
 * @param {string} alphabet - Symbols to be used in ID.
 */
export default (size = 10, alphabet = ALPHABET) =>
  generate(FIRST_ALPHABET, 1) + generate(alphabet, size - 1);
