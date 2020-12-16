import { IDecodedData } from '../types/types';

/**
 * Функция получает закодированный в base64 результат теста (5х5) либо
 * достает значение из URL.
 * Так же проходит валидация входного значения на соответствие base64 и стандартному типу для результата
 * Возвращает объект из трех значений:
 * ```
 * {
 *   encoded: исходное значение,
 *   decoded: раскодированный массив в виде строки,
 *   data: раскодированный массив
 * }
 * ```
 * Если входное значение невалидно, то возвращает объект, в котором значения равны null
 * @param key - ключ query параметра
 * @param encodedValue - зашифрованный в base64 массив данных (5х5), предварительно преобразованный в строку
 */
export function getAndDecodeData(key = 'encdata', encodedValue?: string): IDecodedData {

  const value = encodedValue ? encodedValue.trim() : parseUrl(key);

  if (!value) {
    return {
      encoded: null,
      decoded: null,
      data: null
    };
  }

  const buff = Buffer.from(value, 'base64');
  const userDataString = buff.toString('ascii');

  if (!validateDecodedData(userDataString) || !IsJsonString(userDataString)) {
    return {
      encoded: null,
      decoded: null,
      data: null
    };
  }

  return {
    encoded: value,
    decoded: userDataString,
    data: JSON.parse(userDataString)
  };
}

/**
 * Парсит URL. Ключ по умолчанию = encdata
 * @param key - ключ query параметра
 */
export function parseUrl(key = 'encdata'): string | null {
  let value = null;
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    value = urlParams.get(key);
  }
  return value;
}

/**
 * Валидирует массивообразную строку 5x5 (с помощю регулярки) перед тем, как преобразовывать в массив значений
 * @param value - массив 5х5 преобразованный в строку
 */
export function validateDecodedData(value: string): boolean {
  const regex = /^\[\[([+-]?\d,?)+],\[(\[([+-]?\d,?){5}],?){5}\]\]$/;
  return value.search(regex) === 0;
}

/**
 * Проверка - является ли строка валидной base64 строкой. Работает только в браузере
 * @param str
 */
export function isBase64Browser(str: string): boolean {
  if (typeof window !== 'undefined') {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }
  return false;
}

/**
 * Проверка - можно ли строка валидной как json
 * @param str
 * @constructor
 */
export function IsJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
