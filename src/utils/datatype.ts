/**
 * supOS - 数据类型工具集合
 */

// 数值型 - 整型
export const INT_DATATYPE = 'Integer';
// 数值型 - 长整型
export const LONG_DATATYPE = 'Long';
// 数值型 - 浮点型
export const FLOAT_DATATYPE = 'Float';
// 数值型 - 双精度浮点型
export const DOUBLE_DATATYPE = 'Double';
// 逻辑型
export const BOOLEAN_DATATYPE = 'Boolean';
// 字符型
export const STRING_DATATYPE = 'String';
// 时间型
export const DATETIME_DATATYPE = ['Date', 'Time', 'Timestamp', 'Year'];
// 数值型 - 大整型
export const BIGINTEGER_DATATYPE = 'BigInteger';
// 数值型 - 大浮点型
export const BIGDECIMAL_DATATYPE = 'BigDecimal';

// 类型组合
export const DATATYPE_DATATYPEIFIERS = {
  integer: INT_DATATYPE,
  long: LONG_DATATYPE,
  float: FLOAT_DATATYPE,
  double: DOUBLE_DATATYPE,
  boolean: BOOLEAN_DATATYPE,
  string: STRING_DATATYPE,
  datetime: DATETIME_DATATYPE,
  bigInteger: BIGINTEGER_DATATYPE,
  bigDecimal: BIGDECIMAL_DATATYPE
};

// 类型集合
export const DATATYPE_SETS = [
  'Integer',
  'Double',
  'Float',
  'Long',
  'String',
  'Boolean',
  'Datetime',
  'BigInteger',
  'BigDecimal'
];

/**
 * 通过正则检测是否匹配类型
 *
 * @param {string} data - 待检测的数据
 * @param {string|array} type - 待检测的数据类型
 * @param {string} [regexpFlags='i'] - 正则表达式的标志，默认忽略大小写
 *
 * @returns {boolean}
 */
const checkDataTypeByRegExp = (
  data = '',
  type: string | any[],
  regexpFlags = 'i'
) =>
  _.isArray(type)
    ? _.some(type, t => new RegExp(t, regexpFlags).test(data))
    : new RegExp(type, regexpFlags).test(data);

/**
 * 检测是否为整型
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isIntDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(data, INT_DATATYPE);

/**
 * 检测是否为长整型
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isLongDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(data, LONG_DATATYPE);

/**
 * 检测是否为大整型
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isBigIntDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(data, BIGINTEGER_DATATYPE);

/**
 * 检测是否为浮点型
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isFloatDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(data, FLOAT_DATATYPE);

/**
 * 检测是否为双精度浮点型
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isDoubleDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(data, DOUBLE_DATATYPE);

/**
 * 检测是否为大精度浮点型
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isBigDecimalDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(data, BIGDECIMAL_DATATYPE);

/**
 * 检测是否为数值型(整型、长整型、浮点型、双精度浮点型)
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isNumericDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(
    data,
    _.concat(
      INT_DATATYPE,
      LONG_DATATYPE,
      FLOAT_DATATYPE,
      DOUBLE_DATATYPE,
      BIGINTEGER_DATATYPE,
      BIGDECIMAL_DATATYPE
    )
  );

/**
 * 检测是否为布尔逻辑型
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isBooleanDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(data, BOOLEAN_DATATYPE);

/**
 * 检测是否为字符型
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isStringDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(data, STRING_DATATYPE);

/**
 * 检测是否为时间型
 *
 * @param {string} data - 待检测的数据
 *
 * @returns {boolean}
 */
export const isDatetimeDataType = (data: string | undefined) =>
  checkDataTypeByRegExp(data, DATETIME_DATATYPE);

/**
 * 获取数据类型的文本
 *
 * @param {string} data - 待检测的数据
 * @param {boolean} [multiNumeric = false] - 是否聚合数值型
 * @param {string} [locale = 'cn'] - 返回语言，默认时中文
 *
 * @returns {string} - 返回类型的文本
 */
export const getDataTypeText = (
  data: string | undefined,
  multiNumeric = false,
  locale = 'cn'
) => {
  let result = '';
  if (multiNumeric && isNumericDataType(data)) {
    result = locale === 'cn' ? '数值型' : 'Numerical';
  } else if (isIntDataType(data)) {
    result = locale === 'cn' ? '整型' : 'Integer';
  } else if (isLongDataType(data)) {
    result = locale === 'cn' ? '长整型' : 'Long';
  } else if (isFloatDataType(data)) {
    result = locale === 'cn' ? '浮点型' : 'Float';
  } else if (isDoubleDataType(data)) {
    result = locale === 'cn' ? '双精度浮点型' : 'Double';
  } else if (isBooleanDataType(data)) {
    result = locale === 'cn' ? '逻辑型' : 'Boolean';
  } else if (isStringDataType(data)) {
    result = locale === 'cn' ? '字符型' : 'String';
  } else if (isDatetimeDataType(data)) {
    result = locale === 'cn' ? '时间型' : 'Datetime';
  } else if (isBigIntDataType(data)) {
    result = locale === 'cn' ? '大整型' : 'BigInteger';
  } else if (isBigDecimalDataType(data)) {
    result = locale === 'cn' ? '大浮点型' : 'BigDecimal';
  }

  return result;
};

/**
 * 获取数据类型的取值标准的数值代号，(数值型 >> 0, 非数值型 >> 1)
 *
 * @param {string} data - 待检测的数据
 */
export const getDataTypeAggrType = (data: string | undefined) =>
  isNumericDataType(data) ? 0 : 1;

export default DATATYPE_DATATYPEIFIERS;
