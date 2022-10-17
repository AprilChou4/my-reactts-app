//不能输入非汉字效验  效验不能输入非空字符串
export const validateNoChinese = (
  _rule: any,
  value: string,
  callback: (params?: any) => void
) => {
  const reg = /^[^\u4e00-\u9fa5]+$/g;
  const regEmpty = /^\s*$/g;
  if (value && !reg.test(value)) {
    callback('请输入非中文!');
  } else if (value && regEmpty.test(value)) {
    callback('值不能为空!');
  } else {
    callback();
  }
};
