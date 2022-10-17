import React from 'react';
import moment from 'moment';

import { timeDefault } from '@consts/indicator';

/**
 * 指标 固化规则  生成cron表达式
 * @param data 表单数据
 */
export const getCron = (data: any) => {
  const { timeType } = data;
  let cron = '';

  if (timeType === 'minute') {
    const { endTimeMinute, startTimeMinute, timeGap } = data;
    cron = `0 0/${timeGap} ${startTimeMinute}-${endTimeMinute} * * ? *`;
  }

  if (timeType === 'hour') {
    const { hourType, startTimeMinute, endTimeMinute, timeGap, appointHour } =
      data;
    if (hourType === '1') {
      cron = `0 0 ${startTimeMinute}-${endTimeMinute}/${timeGap} * * ? *`;
    } else if (hourType === '2') {
      cron = `0 0 ${appointHour.join()} * * ? *`;
    }
  }

  if (timeType === 'day') {
    const { appointDay } = data;
    cron = `0 0 ${appointDay.join()} * * ? *`;
  }

  if (timeType === 'week') {
    const { appointWeek, specTimeWeek } = data;
    cron = `0 0 ${specTimeWeek.join()} ? * ${appointWeek.join()} *`;
  }

  if (timeType === 'month') {
    const { appointMonth, specTimeMonth } = data;
    cron = `0 0 ${specTimeMonth.join()} ${appointMonth.join()} * ? *`;
  }

  return cron;
};

const formatValue = (text: any, dataType: string) => {
  if (_.isNil(text)) return '';
  if (dataType === 'Boolean') {
    if (typeof text === 'boolean') {
      text = text.toString();
      return text;
    } else if (_.isNumber(text)) {
      return text === 1 ? 'true' : text === 0 ? 'false' : text;
    } else {
      return text;
    }
  } else if (dataType === 'Double') {
    return text === 'NaN' ? <span className="error-data">NaN</span> : text;
  } else if (_.includes(['Year', 'Date', 'Datetime', 'Time'], dataType)) {
    const value = Number(text);
    if (_.isNaN(value) || _.isNil(text)) {
      return '';
    }
    if (dataType === 'Year') {
      return moment(value).format('YYYY');
    } else if (dataType === 'Date') {
      return moment(value).format('YYYY-MM-DD');
    } else if (dataType === 'Datetime') {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    } else if (dataType === 'Time') {
      return `${moment.duration(value).format('HH:mm')}分`;
    }
  } else {
    return text;
  }
};

/**
 * @description: 根据时间维度的配置信息和系统时间的配置信息获取时间偏移量
 * @param {object} dimensionTime 指标 时间维度配置信息
 * @param {object} systemConfig  指标系统时间配置
 * @return {object} offsetTime  返回实际的对应偏移类型及偏移时间
 */
export const getTimeOffset = (
  dimensionTime: any = {},
  systemConfig: any = {}
) => {
  let config;
  const systemTime = _.isEmpty(systemConfig)
    ? _.cloneDeep(timeDefault)
    : _.cloneDeep(systemConfig);
  if (!_.isEmpty(dimensionTime)) {
    const { type, timeJson } = dimensionTime;
    switch (type) {
      case 1:
        config = _.isEmpty(timeJson)
          ? systemTime
          : {
              year: {
                startYearMonth: _.get(timeJson, 'startYearMonth', '01'),
                startYearMonthDay: _.get(timeJson, 'startYearMonthDay', '01')
              }
            };
        break;
      case 3:
        config = _.isEmpty(timeJson)
          ? systemTime
          : {
              month: {
                startMonthDay: _.get(timeJson, 'startMonthDay', '01')
              }
            };
        break;
      case 4:
        config = _.isEmpty(timeJson)
          ? systemTime
          : {
              week: {
                startWeekDay: _.get(timeJson, 'startWeekDay', 1)
              }
            };
        break;
      case 5:
        config = _.isEmpty(timeJson)
          ? systemTime
          : {
              day: {
                startDayHour: _.get(timeJson, 'startDayHour', 0)
              }
            };
        break;

      default:
        config = systemTime;
    }
  } else {
    config = systemTime;
  }
  config.type = _.get(dimensionTime, 'type');
  return config;
};

/**
 * @description: 根据周偏移量，以及当前第一周的时间，获取偏移之后的第一周开始的时间
 * @param {number} year 配置的具体的年份
 * @param {number} offset 周偏移量
 * @return {number} 偏移之后第一周的时间戳
 */
const getFirstWeekDatetime = (year: number, offset: number) => {
  let firstWeekDatetime;
  const firstDateTime = moment(`${year}-01-01`).valueOf();
  const firstDay = moment(firstDateTime).day() || 7;
  if (
    (firstDay === 5 && offset <= 1) ||
    (firstDay === 6 && offset <= 2) ||
    (firstDay === 7 && offset <= 3)
  ) {
    firstWeekDatetime =
      firstDateTime + (offset + 7 - firstDay) * 24 * 3600 * 1000;
  } else if (
    (firstDay === 1 && offset >= 5) ||
    (firstDay === 2 && offset >= 6) ||
    (firstDay === 3 && offset >= 7)
  ) {
    firstWeekDatetime =
      firstDateTime + (offset - firstDay - 7) * 24 * 3600 * 1000;
  } else {
    firstWeekDatetime = firstDateTime + (offset - firstDay) * 24 * 3600 * 1000;
  }
  return firstWeekDatetime;
};

export const formatWeek = (value: number, offset: number) => {
  const [cy, cm, cd] = moment(value).format('YYYY-MM-DD').split('-');
  let firstWeekDatetime;
  let weekInYear;
  const currentYearFirstWeekDatetime = getFirstWeekDatetime(Number(cy), offset);
  if (
    `${cm}-${cd}` === '12-29' ||
    `${cm}-${cd}` === '12-30' ||
    `${cm}-${cd}` === '12-31'
  ) {
    const nextYearFirstWeekDatetime = getFirstWeekDatetime(
      Number(cy) + 1,
      offset
    );

    if (value < nextYearFirstWeekDatetime) {
      firstWeekDatetime = currentYearFirstWeekDatetime;
      weekInYear = cy;
    } else {
      firstWeekDatetime = nextYearFirstWeekDatetime;
      weekInYear = Number(cy) + 1;
    }
  } else if (
    `${cm}-${cd}` === '01-01' ||
    `${cm}-${cd}` === '01-02' ||
    `${cm}-${cd}` === '01-03'
  ) {
    if (value < currentYearFirstWeekDatetime) {
      firstWeekDatetime = getFirstWeekDatetime(Number(cy) - 1, offset);
      weekInYear = Number(cy) - 1;
    } else {
      firstWeekDatetime = currentYearFirstWeekDatetime;
      weekInYear = cy;
    }
  } else {
    firstWeekDatetime = currentYearFirstWeekDatetime;
    weekInYear = cy;
  }
  const week = Math.ceil(
    (value + 24 * 3600 * 1000 - firstWeekDatetime) / (7 * 24 * 3600 * 1000)
  );

  return { year: weekInYear, week };
};

/**
 * @description: 根据时间配置 匹配对应的格式化方案
 * @param {number} type 枚举类型 1-按年 2-按季度 3-按月 4-按周 5-按日 6-按时 7-按分 9-按原始值
 * @param {string} dataType 时间数据类型，Year,Time,Date,Datetime 可能为Long
 * @param {object} timeOffset  时间偏移配置 结合指标维度时间配置和系统时间配置
 * @return {Function} 格式化操作函数
 */
export const getFormatTimeFn =
  (dataType: string, timeOffset: any) => (v: number) => {
    const { type } = timeOffset;
    const value = Number(v);
    if (value === 0 || _.isNaN(value) || _.isNil(v)) {
      return '';
    }
    if (type === 1) {
      return moment(value).format('YYYY');
    } else if (type === 2) {
      return `${moment(value).format('YYYY')}年 第${moment(value).format(
        'Q'
      )}季度`;
    } else if (type === 3) {
      return moment(value).format('YYYY-MM');
    } else if (type === 4) {
      if (_.isEmpty(_.get(timeOffset, 'week'))) {
        return moment(value).format('gggg年 第ww周');
      } else {
        const { year, week } = formatWeek(
          value,
          _.get(timeOffset, 'week.startWeekDay', 1)
        );
        return `${year}年 第${week < 10 ? `0${week}` : week}周`;
      }
    } else if (type === 5 || (type === 9 && dataType === 'Date')) {
      return moment(value).format('YYYY-MM-DD');
    } else if (type === 6) {
      if (dataType === 'Time') {
        return `${moment.duration(value).format('HH')}时`;
      } else {
        return `${moment(value).format('YYYY-MM-DD HH')}时`;
      }
    } else if (type === 7) {
      if (dataType === 'Time') {
        return `${moment.duration(value).format('HH:mm')}分`;
      } else {
        return `${moment(value).format('YYYY-MM-DD HH:mm')}分`;
      }
    } else if (type === 9) {
      // 按原始值
      if (dataType === 'Year') {
        return moment(value).format('YYYY');
      } else if (dataType === 'Date') {
        return moment(value).format('YYYY-MM-DD');
      } else if (dataType === 'Datetime') {
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
      } else if (dataType === 'Time') {
        return `${moment.duration(value).format('HH:mm')}分`;
      } else {
        return formatValue(v, dataType);
      }
    } else {
      return formatValue(v, dataType);
    }
  };

const joinTr = (data: any[], columns: any[]) => {
  let trs = '';
  _.forEach(data, (item: any) => {
    let text = '';
    _.forEach(columns, c => {
      const value = item[c.otherName];
      const rowSpan = _.isFunction(c.getRowSpan)
        ? c.getRowSpan(value, item)
        : 1;
      text += rowSpan
        ? `<td class='ellipsis-hide' title='${value}' ${
            rowSpan > 1 ? `rowspan='${rowSpan}'` : ''
          }>${value}</td>`
        : '';
    });
    trs += `<tr class='sup-table-row sup-table-row-level-0'>${text}</tr>`;
  });
  return trs;
};

export const formatIndicatorCacheData = (
  title: any[],
  data: any[],
  timeParams?: {
    key: string;
    clientDataType: string;
    dimensionTime: any;
    systemTimeConfig: any;
  }
) => {
  const titleMapping: { [propName: string]: any } = {};
  _.forEach(title, i => {
    titleMapping[i.otherName] = i;
  });
  if (timeParams && !_.isEmpty(timeParams)) {
    const {
      key,
      clientDataType,
      dimensionTime = {},
      systemTimeConfig = {}
    } = timeParams;
    const timeOffset = getTimeOffset(dimensionTime, systemTimeConfig);
    const formatTimeFn = getFormatTimeFn(clientDataType, timeOffset);
    data = _.map(data, (item: any) => {
      _.forIn(item, (v, k) => {
        if (titleMapping[k].clientDataType === 'Double' && v === 5e-324) {
          item[k] = 'NaN';
        } else if (k === key) {
          item[k] = formatTimeFn(item[key]);
        } else {
          item[k] = formatValue(v, titleMapping[k].clientDataType);
        }
      });
      return item;
    });
  } else {
    data = _.map(data, (item: any) => {
      _.forIn(item, (v, k) => {
        if (titleMapping[k].clientDataType === 'Double' && v === 5e-324) {
          item[k] = 'NaN';
        } else {
          item[k] = formatValue(v, titleMapping[k].clientDataType);
        }
      });
      return item;
    });
  }
  return data;
};

/**
 * @description: 格式化指标缓存数据 聚合后台返回数据，并对列做分类处理，聚合只针对维度进行聚合，数值不做聚合
 * 指标缓存数据排部顺序 先是维度 后是指标
 * @param {array} title  约定为纯数组 如：[title,name,age] 元素为数据key值索引
 * @param {array} data 返回数据列表，需要先对列表进行排序处理，并将处理后的数据返回
 * @param {number} firstNumberIndex title 中第一个为数值类型的key所在的索引，在此之后的索引都不做聚合
 * @param {object|undefined} timeParams 针对含有时间维度的指标组进行聚合的操作
 * key: 时间维度对应的key 别名
 * clientDataType: 时间维度的数据类型  Datetime Date Time
 * dimensionTime: 时间维度的配置信息
 * systemTimeConfig: 指标系统时间配置信息
 * 根据dimensionTime 和 systemTimeConfig 计算出实际的时间配置（偏移量）
 * @return: columns table表的表头信息，dataSource table表需要的数据
 */
export const groupIndicatorCacheData = (
  title: any[],
  data: any[],
  firstNumberIndex: number,
  timeParams?: {
    key: string;
    clientDataType: string;
    dimensionTime: any;
    systemTimeConfig: any;
  }
): string => {
  data = formatIndicatorCacheData(title, data, timeParams);
  if (!title.length) {
    return '';
  } else {
    let thead = "<thead class='sup-table-thead'><tr>";
    _.forEach(title, t => (thead += `<th title='${t.name}'>${t.name}</th>`));
    thead += `</tr></thead>`;
    let content = '';
    if (title.length === 1 || firstNumberIndex === 0) {
      content += joinTr(data, title);
    } else if (_.isEmpty(data)) {
      content = `<div class="sup-table-placeholder"><div class="sup-empty sup-empty-normal"><div class="sup-empty-image"></div><p class="sup-empty-description">暂无数据</p></div></div>`;
    } else {
      const dimensions: any[] = [];
      const orders: any[] = [];
      _.forEach(title, i => {
        if (i.type === 1) {
          dimensions.push(i.otherName);
          orders.push('asc');
        }
      });
      data = _.orderBy(data, dimensions, orders);
      const groupData = {
        [title[0].otherName]: _.groupBy(data, title[0].otherName)
      };
      let rowValue: any = {};

      const firstColumns = title[0];
      let columns: any[] = [
        {
          otherName: firstColumns.otherName,
          getRowSpan: (value: any) => {
            let rowSpan;
            if (rowValue[firstColumns.otherName] !== value) {
              rowSpan = groupData[firstColumns.otherName][value].length;
              rowValue = {};
              rowValue[firstColumns.otherName] = value;
            } else {
              rowSpan = 0;
            }
            return rowSpan;
          }
        }
      ];

      const centerColumns: any = title.slice(1, firstNumberIndex);
      columns = columns.concat(
        _.map(centerColumns, (item, index: any) => {
          return {
            otherName: item.otherName,
            getRowSpan: (value: any, row: any) => {
              let rowSpan;
              if (rowValue[item.otherName] !== value) {
                const preColumnName = title[index].otherName;
                groupData[item.otherName] = _.groupBy(
                  groupData[preColumnName][row[preColumnName]],
                  item.otherName
                );
                rowSpan = groupData[item.otherName][value].length;
                rowValue = _.omit(
                  rowValue,
                  _.map(centerColumns.slice(index), i => i.otherName)
                );
                rowValue[item.otherName] = value;
              } else {
                rowSpan = 0;
              }
              return rowSpan;
            }
          };
        })
      );

      const lastColumns = title.slice(firstNumberIndex);
      _.forEach(lastColumns, item => {
        columns.push({
          otherName: item.otherName,
          getRowSpan: () => 1
        });
      });
      const trs = joinTr(data, columns);
      content = `<div class="sup-table-body" style="max-height: calc(100% - 50px); overflow-y: scroll;">
			<table><tbody  class='sup-table-tbody'>${trs}</tbody></table>
			</div>`;
    }
    return `<div class="sup-table sup-table-small sup-table-bordered sup-table-fixed-header">
		<div class="sup-table-content"><div class="sup-table-scroll">
		<div class="sup-table-header" style="margin-bottom: -8px; padding-bottom: 0px;">
		<table >${thead}</table></div>${content}</div></div></div>`;
  }
};

export const getIndicatorSourceName = (sourceName: any) => {
  if (_.isArray(sourceName)) {
    return _.map(sourceName, item => item.name || '').join(',');
  } else if (_.isObject(sourceName) as any) {
    return sourceName.name;
  } else {
    return sourceName;
  }
};

export const getIndicatorDim = (dimensionInfo: any): string => {
  if (dimensionInfo && _.isArray(dimensionInfo.groupBy)) {
    return dimensionInfo.groupBy.join(',');
  } else {
    return '';
  }
};

/**
 * @description: 获取时间维度的状态
 * @param {number} type 枚举类型 1-按年 2-按季度 3-按月 4-按周 5-按日 6-按时 7-按分 9-按原始值
 * 根据枚举值对应的时间类型，校验过滤条件中配置的值是否满足当前时间维度所允许的值
 * 如： 设置的时间为按日，偏移量为03：00 那么满足 YYYY-DD-MM 03：00：00 的日期时间都满足当前限制条件，反之亦然
 * @param {string|undefined} value 指标过滤中时间类型设置的值
 * @param {object} dimensionTime 时间维度的配置信息
 * @param {object} systemConfig 指标系统配置有关时间的配置信息
 * @return {boolean} 校验之后的状态
 */
export const getTimeDimensionStatus = (
  value: string | undefined,
  dimensionTime: any = {},
  systemConfig: any = {}
): boolean => {
  if (_.isNil(value)) return false;
  const timeOffset = getTimeOffset(dimensionTime, systemConfig);
  const type = _.get(timeOffset, 'type');
  // 判断过滤内容是否为整数
  if (Number.isNaN(parseInt(value))) return false;
  const timestamp = parseInt(value);
  if (type === 1) {
    const startYearMonth = _.get(timeOffset, 'year.startYearMonth', '1');
    const startYearMonthDay = _.get(timeOffset, 'year.startYearMonthDay', '1');
    return moment(timestamp)
      .format('YYYY-M-D HH:mm:ss')
      .endsWith(`-${startYearMonth}-${startYearMonthDay} 00:00:00`);
  } else if (type === 2) {
    const format = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    return (
      format.endsWith('-01-01 00:00:00') ||
      format.endsWith('-04-01 00:00:00') ||
      format.endsWith('-07-01 00:00:00') ||
      format.endsWith('-10-01 00:00:00')
    );
  } else if (type === 3) {
    return moment(timestamp)
      .format('YYYY-MM-D HH:mm:ss')
      .endsWith(`-${_.get(timeOffset, 'month.startMonthDay', '1')} 00:00:00`);
  } else if (type === 4) {
    return (
      moment(timestamp).format('YYYY-MM-DD HH:mm:ss').endsWith(' 00:00:00') &&
      moment(timestamp).day() === _.get(timeOffset, 'week.startWeekDay', 1)
    );
  } else if (type === 5) {
    const format = moment(timestamp).format('H:mm:ss');
    return (
      format.startsWith(`${_.get(timeOffset, 'day.startDayHour', 0)}`) &&
      format.endsWith(':00:00')
    );
  } else if (type === 6) {
    return moment(timestamp).format('HH:mm:ss').endsWith(':00:00');
  } else if (type === 7) {
    return moment(timestamp).format('HH:mm:ss').endsWith(':00');
  } else if (type === 9) {
    return true;
  } else {
    return false;
  }
};

//前后20年
export const genYears = (): any[] => {
  const result: any = [];
  const start = moment().subtract(20, 'years').year();
  const end = moment().add(20, 'years').year();

  for (let i = start; i <= end; i++) {
    result.push({
      value: i,
      label: i,
      children: [
        { value: '1', label: 'Q1' },
        { value: '2', label: 'Q2' },
        { value: '3', label: 'Q3' },
        { value: '4', label: 'Q4' }
      ]
    });
  }

  return result;
};
