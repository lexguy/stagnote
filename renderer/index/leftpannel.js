/*
 * @Author: xuxiaowei
 * @Date: 2020-12-26 19:30:10
 * @LastEditTime: 2021-01-02 20:31:28
 * @LastEditors: xuxiaowei
 * @Description: 控制左边的面板
 */

let WEEK = ["周 一", "周 二", "周 三", "周 四", "周 五", "周 六", "周 日"];

const weekDiv = document.querySelector("#weekarray");

let weekArray = document.createElement("div");
weekArray.className = "weekarray";

const dayInWeek = new Date().getDay(); // getDay  0-6   0 为星期天
let checkedIndex = dayInWeek - 1 === -1 ? 6 : dayInWeek - 1; // 选中的 Index
const nowIndex = checkedIndex; // 当前周第几天   不变

for (let index = 0; index < 7; index++) {
  let weekItem = document.createElement("span");
  weekItem.innerHTML = WEEK[index];
  weekItem.className = "week_item";
  if (index === checkedIndex) {
    weekItem.className = "week_item week_check week_cur";
  }
  weekItem.dataset.flag = index;
  weekArray.appendChild(weekItem);
}
weekArray.addEventListener("click", onWeekItemPress);
weekDiv.appendChild(weekArray);

// Item click
function onWeekItemPress(clickEle) {
  const clickFlag = parseInt(clickEle.target.dataset.flag);
  if (clickFlag == checkedIndex) {
    return;
  } else {
    const nodes = weekArray.childNodes;
    for (let index = 0; index < nodes.length; index++) {
      const element = nodes.item(index);
      if (element.className.includes("week_check")) {
        element.className =
          index === nowIndex ? "week_item week_cur" : "week_item";
      }
    }
    clickEle.target.className =
      clickFlag === nowIndex
        ? "week_item week_check week_cur"
        : "week_item week_check";
    checkedIndex = parseInt(clickFlag);
  }
}
