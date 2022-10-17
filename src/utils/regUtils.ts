//正则

//解析路径  path/path/path
// export const filePathReg = new RegExp(/^[A-Za-z0-9]+(\/[A-Za-z0-9]+)+$/);
// export const filePathReg = new RegExp(/^[\w]+(\/[\w]+)+$/);
// export const filePathReg = new RegExp(/^[^/][\w|\W|]+[^/]$/);
// export const filePathReg = new RegExp(/^[^/][(?!\//)|\w|\W]+[^/]$/);
export const filePathReg = new RegExp(/^([^\/\s]+)(\/([^\/\s]+))*$/g);

//IP正则
export const ipReg =
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

//版本格式V0.0
export const versionReg = new RegExp(/^V([0-9]\d*)\.([0-9]\d*)$/);

//正整数正则
export const numberReg = new RegExp(/^[1-9]\d*$/);

// 整数正则
export const intReg = new RegExp(/^-?[1-9]\d*$/);

// 浮点数正则  必须含有小数点
export const floatReg = new RegExp(/^-?(0|[1-9][0-9]*)\.([0-9]+)$/);

// 判断是否有变量
export const varReg = new RegExp(/^#\{(\w+)\}$/);
//匹配日期格式正则
export const dateReg = /^\d{4}(-|\/)\d{2}\1\d{2}$/;
export const dateTimeReg = /^\d{4}(-|\/)\d{2}\1\d{2}\s\d{2}(:)\d{2}(:)\d{2}$/;
