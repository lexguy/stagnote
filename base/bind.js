/*
 * @Author: xuwei
 * @Date: 2020-09-30 11:46:06
 * @LastEditTime: 2020-09-30 12:52:35
 * @LastEditors: xuwei
 * @Description:
 */
const $ = (id) => {
  return document.querySelector("#" + id);
};

const registerEnterKeyEvent = (ele, action) => {
  // const ele = $(id);
  ele.addEventListener("keydown", (event) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode == "13") {
      event.preventDefault();
      action && action();
    }
  });
};

module.exports = {
  $,
  registerEnterKeyEvent,
};
