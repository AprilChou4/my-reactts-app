/*
 * @Description:
 * @Author: zhouxiaojuan
 * @Date: 2021-08-16 17:43:47
 * @LastEditTime: 2022-03-11 11:37:59
 * @LastEditors: zhouxiaojuan
 */
/*
 * yunrong.cn Inc. Copyright (c) 2014-2020 All Rights Reserved
 */
/**
 *常用正则校验
 *
 */
 export default {
    // ----------------------信贷系统全局规则---------------------------------
    // 数值最大输入9999 9999 9999.99
    // 数值型统一以千分位显示，未做特殊标注的数值型都指大于0的数值，整数不需要小数点后面的两个零，最多保留2位小数
    // 各类比例值，百分号表示，百分号后保留2位小数，四舍五入
    maxNumber: 999999999999.99,
    maxNatureNumber: 999999999999,
  
    // ---------------------------校验规则--------------------------------------
    // 手机号码：11位，以1开头，第二位为3,4,5,7,8中的一个，后9位数字。
    phone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  
    // 固定电话：区号+号码，区号以0开头，3位或4位，号码由7位或8位数字组成，区号与号码之间可以无连接符，也可以“-”连接。
    tele: /^0\d{2,3}-?\d{7,8}$/,
  
    // 邮箱格式：第一部分@第二部分。第一部分：由字母、数字、下划线、短线“-”、点号“.”组成。第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，域名后缀一般为.xxx或.xxx.xx。
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
  
    // 身份证:15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    idCard: /(^\d{15}$)|(^\d{17}(\d|X|x)$)/,
  
    // 密码：至少8位，字符由字母、数字及特殊字符（例如_@!?）组合
    password: /^[a-zA-Z0-9_@!?#$%&/.*+]{8,}$/,
  
    // 银行卡号：第一位不是0，16位或者19位
    bankCard: /^([1-9]{1})(\d{15}|\d{18})$/,
  
    // 禁止输入中文
    unchinese: /^[^\u4e00-\u9fa5]{0,}$/,
  
    // 禁止输入特殊字符
    uncode: /[^a-zA-Z0-9\u4E00-\u9FA5]/g,
  
    // 中文
    chinese: /[\u4e00-\u9fa5]$/,
  
    // 英文
    english: /[a-zA-Z]$/,
  
    // 匹配中文，英文
    chineseAndEnglish: /^[\u4e00-\u9fa5a-zA-Z]+$/,
  
    // 数字且小数点后不超过2位
    float2: /^\d+(\.\d{1,2})?$/,
  
    // 数字且小数点后不超过4位
    float4: /^\d+(\.\d{1,4})?$/,
  
    // 中国邮政编码为6位数字
    postalCode: /^[1-9]\d{5}(?!\d)/,
  
    // URL
    url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
  
    // 整数
    Integer: /^-?[1-9]\d*$/,
  
    // 自然数
    naturalNumber: /^\d+$/,
  
    // 正整数
    nonZeroPositiveInteger: /^\+?[1-9][0-9]*$/,
  
    // 负整数
    nonZeroNegativeInteger: /^-[1-9]\d*$/,
  
    // 支持字母和数字
    LettersAndNumbers: /^[0-9A-Za-z]+$/,
    // 支持大小写字母、中文汉字、数字、符号，其中符号支持除以下特殊之外的键盘半角可见字符：单引号（'）、双引号(")、百分号(%)、星号(*)、冒号(:)、竖线(|)），不允许有空格 ASCII匹配
    specialChar: /^[a-zA-Z0-9\x21\x23-\x24\x26\x28\x29\x2b-\x2f\x3b-\x40\x5b-\x60\x7B\x7D-\x7F\u4e00-\u9fa5]+$/g,
    // 数字、字母及符号
    numLetterSymbol: /^[a-zA-Z0-9\x21\x23-\x24\x26\x28\x29\x2b-\x2f\x3b-\x40\x5b-\x60\x7B\x7D-\x7F]+$/g,
    // specialChar之外的，用于settingFormreplace
    notAllowChar: /['"%*:|]+/g,
    // 密码需要包含数字、字母、符号, 至少6-16位
    userPassword: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()`:";'<>_?=,+.-])[\da-zA-Z~!@#$%^&*()`:";'<>_?=,+.-]{6,16}$/,
  };
  