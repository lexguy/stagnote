/*
 * @Author: xuxiaowei
 * @Date: 2020-12-26 19:30:10
 * @LastEditTime: 2020-12-26 20:44:50
 * @LastEditors: xuxiaowei
 * @Description: 控制左边的面板
 */

console.info("Test");

let WEEK = ["周 一", "周 二", "周 三", "周 四", "周 五", "周 六", "周 日"];

const weekDiv = document.querySelector("#weekarray");

let weekArray = document.createElement("div");
weekArray.className = "weekarray";

for (let index = 0; index < 7; index++) {
  let weekItem = document.createElement("span");
  weekItem.innerHTML = WEEK[index];
  weekItem.className = "week_item";
  weekArray.appendChild(weekItem);
}
console.info("weekArray", weekArray);
weekDiv.appendChild(weekArray);
