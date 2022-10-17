/**
 * @description: 根据时间值的长短判断属于哪种时间类型
 * 2019 年份  Year
 * 2019-01-01 日期  枚举 Date
 * 2019-01-01 08:00:00  日期加时间  枚举 Timestamp
 * 08:00:00 时间 枚举 Time
 * 0 指的是为匹配的 数据类型
 * @param {string} 时间值
 * @return: string 对应的时间类型
 */
export const getTimeTypeByValue = (dateTimeValue: string): string => {
  if (dateTimeValue) {
    if (`${dateTimeValue}`.length === 10) {
      return 'Date';
    } else if (`${dateTimeValue}`.length > 10) {
      return 'Timestamp';
    } else if (`${dateTimeValue}`.length === 4) {
      return 'Year';
    } else if (`${dateTimeValue}`.length === 8) {
      return 'Time';
    } else {
      return '';
    }
  } else {
    return '';
  }
};

/**
 * @description: 根据变量配置信息，将变量类型转换为前后端约定的数据类型
 * @param {object} varItem 单个变量的配置信息
 * @return: string dataType 前后端约定的数据类型
 */
export const transVarType2DataType = (varItem: any): string | undefined => {
  const { dataType, constValue } = varItem;
  let transDateType;
  if (dataType === 'Datetime') {
    if (_.isEmpty(constValue)) return;
    const constValueType = constValue.type;
    if (constValueType === 1) {
      transDateType = getTimeTypeByValue(constValue.value);
    } else if (_.includes([2, 3, 4, 5, 6], constValueType)) {
      transDateType = 'Date';
    } else if (constValueType === 7) {
      transDateType = 'Year';
    }
  } else {
    transDateType = dataType;
  }
  return transDateType;
};
