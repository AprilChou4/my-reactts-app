/**
 * @description: Select DropDown 等antd getPopupContainer 属性
 * 鼠标滚动时候不会偏移
 * @param {HTMLElement} triggerNode 触发节点
 * @return: 触发节点的父节点
 */
export const popupContainer = (triggerNode: HTMLElement) =>
  triggerNode.parentNode as HTMLElement;
