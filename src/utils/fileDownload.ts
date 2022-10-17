import moment from 'moment';

export const fileDownload = (url: string, title?: string) => {
  const aObj = document.createElement('a');
  if (title) {
    aObj.download = title;
  }

  aObj.style.display = 'none';
  aObj.href = url;
  document.body.appendChild(aObj);
  aObj.click();
  document.body.removeChild(aObj);
};

export const exportCSV = ({
  title = '',
  headers = [],
  keys = [],
  dataList = []
}: {
  title: string;
  headers: string[];
  keys: string[];
  dataList: any[];
}) => {
  /*
   *注：csv文件：","逗号换列，\n换行，\t防止excel将长数字变科学计算法等样式
   */
  //## 数据处理
  //一级表
  const mainStr = [];
  mainStr.push(headers.join(',') + '\n'); //标题添加上换列转成字符串并存进数组
  for (let i = 0; i < dataList.length; i++) {
    const temp = [];
    for (let j = 0; j < keys.length; j++) {
      temp.push(dataList[i][keys[j]]); //根据过滤器拿出对应的值
    }
    mainStr.push(temp.join(',') + '\n'); //取出来的值加上逗号换列转字符串存数组
  }
  // console.log(JSON.stringify(mainStr.join("")));//打印文本

  //两个表数组转成字符串合并
  const merged = mainStr.join('');
  //console.log(JSON.stringify(merged));//打印结果

  //## 导出操作
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(merged);
  // 通过创建a标签实现
  const link = document.createElement('a');
  link.href = uri;
  // 对下载的文件命名
  link.download = `${title}${moment().format('YYYYMMDDHHmmss')}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const assetFileDownload = (data: any, title: string) => {
  const createA = document.createElement('a');
  createA.download = title;
  createA.style.display = 'none';
  const blob = new Blob([data], { type: 'application/zip' });
  createA.href = URL.createObjectURL(blob);
  document.body.appendChild(createA);
  createA.click();
  document.body.removeChild(createA);
};
