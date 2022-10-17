import moment from "moment";
import { message } from "antd";

/**
 * @description: inputNumber 限制只能输入非负整数 需要搭配 formatter parser 使用
 * @param {number} value inputNumber 返回值
 * @return {number} 格式化后的值
 */
export function limitInt(value: any) {
  if (value - 0) {
    return `${value}`.replace(/\D/g, "");
  } else {
    return "0";
  }
}

/**
 * @description: 同步执行中 延迟执行 (注：谨慎使用)，非必要时采用其他途径替换
 * 使用方式 await sleep([millisecond]) 配合 async
 */
export const sleep = (millisecond: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, millisecond);
  });
};

/**
 * @description: 转换json字符串
 */
export const transJsonParse = (value: any, defaultValue = {}) => {
  if (_.isString(value) && value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
};

/**
 * @description: 判断JSON串是否是 正确的 json 格式
 * 如果是 返回对应的 JSON 对象 反之返回 false
 * @param {string} str JSON串
 * @return {object|boolean}
 */
export const isJson = (str: string) => {
  if (typeof str === "string") {
    try {
      const obj = JSON.parse(str);
      if (obj && typeof obj === "object") {
        return obj;
      } else {
        return false;
      }
    } catch (e) {
      console.error(`error：${e}`);
      return false;
    }
  } else {
    return false;
  }
};

/**
 * @description: 获取中英文字符串字节长度
 */
export const getCharLength = (str: string) => {
  if (!_.isString(str) || str === "") return 0;
  let charLength = 0;
  for (let i = 0; i < str.length; i++) {
    const unicode = str.charCodeAt(i);
    //判断是单字符还是双字符
    if (unicode < 127) {
      charLength += 1;
    } else {
      charLength += 2;
    }
  }
  return charLength;
};

// export const inSupos = (hash: string) => {
//   if (window !== window.parent) {
//     //supos内，带desktop参数则为桌面iframe打开，加载中台layout
//     const search = hash.split('?')[1] || '';
//     const { desktop = 'false' } = qs.parse(search);
//
//     return desktop !== 'true';
//   }
//
//   return false;
// };

//获取userInfo
export const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    return {};
  }
  return transJsonParse(userInfo);
};

/**
 * @description: 获取当前本地时区
 * @return {number} 时区对应的索引
 */
export const getLocalZone = () => {
  return moment().utcOffset();
};

export const currentTimeZone = getLocalZone();

/**
 * @description: 获取本地时区，GMT格式
 * @return {string} GMT格式时区表示法
 */
export const getGMTimeZone = () => {
  const utcOffset: number = currentTimeZone;
  const h = parseInt(`${utcOffset / 60}`);
  const absH = Math.abs(h);
  const m = utcOffset % 60;
  return `GMT${h > 0 ? "+" : "-"}${absH < 10 ? `0${absH}` : absH}:${
    m < 10 ? `0${m}` : m
  }`;
};

/**
 * @description: 将UTC时间转换为本地时区时间
 * 根据UTC时间转换为时间戳，再根据时区做偏移
 * @param {string} utcTime utc时间
 * @return {moment} 返回moment对象
 */
export const UTC2LocalTime = (
  utcTime: string | number | undefined,
  formatType = "HH:mm:ss"
) => {
  if (!utcTime && utcTime !== 0) {
    return "";
  } else if (!_.isNaN(_.toNumber(utcTime))) {
    utcTime = _.toNumber(utcTime);
    return moment(utcTime).utcOffset(currentTimeZone).format(formatType);
  } else {
    return moment(utcTime, formatType).utcOffset(8).format(formatType);
  }
};

export const UTC2LocalDateTime = (utcTime: string | number | undefined) => {
  if (!utcTime && utcTime !== 0) {
    return "";
  } else if (!_.isNaN(_.toNumber(utcTime))) {
    utcTime = _.toNumber(utcTime);
  }
  return moment(utcTime)
    .utcOffset(currentTimeZone)
    .format("YYYY-MM-DD HH:mm:ss");
};

export const UTC2LocalDate = (utcTime: string | number | undefined) => {
  if (!utcTime && utcTime !== 0) {
    return "";
  } else if (!_.isNaN(_.toNumber(utcTime))) {
    utcTime = _.toNumber(utcTime);
  }
  return moment(utcTime).utcOffset(currentTimeZone).format("YYYY-MM-DD");
};

export const copyText = (value: string) => {
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.setAttribute("value", value);
  input.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    document.body.removeChild(input);
  } else {
    message.error("您的浏览器不支持复制！");
  }
};

// 屏幕放大比例
export function detectZoom() {
  let ratio = 0;
  const { screen } = window;
  const ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (~ua.indexOf("msie")) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (
    window.outerWidth !== undefined &&
    window.innerWidth !== undefined
  ) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }

  return ratio;
}
