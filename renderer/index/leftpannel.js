/*
 * @Author: xuxiaowei
 * @Date: 2020-12-26 19:30:10
 * @LastEditTime: 2021-01-01 23:53:20
 * @LastEditors: xuxiaowei
 * @Description: 控制左边的面板
 */

console.info("Test");

let WEEK = ["周 一", "周 二", "周 三", "周 四", "周 五", "周 六", "周 日"];

const weekDiv = document.querySelector("#weekarray");

let weekArray = document.createElement("div");
weekArray.className = "weekarray";

const dayInWeek = new Date().getDay(); // getDay  0-6   0 为星期天
const checkedIndex = dayInWeek - 1 === -1 ? 6 : dayInWeek - 1;

for (let index = 0; index < 7; index++) {
  let weekItem = document.createElement("span");
  weekItem.innerHTML = WEEK[index];
  weekItem.className = "week_item";
  if (index === checkedIndex) {
    console.info("777");
    weekItem.className = "week_item week_check";
  }
  weekItem.dataset.flag = index;
  weekArray.appendChild(weekItem);
}
weekArray.addEventListener("click", onWeekItemPress);
console.info("weekArray", weekArray);
weekDiv.appendChild(weekArray);

function onWeekItemPress(ele) {
  const nodes = weekArray.childNodes;
  for (let index = 0; index < nodes.length; index++) {
    const element = nodes.item(index);
    console.info("ele", element);
  }
}
