/*
 * @Author: xuwei
 * @Date: 2020-09-30 09:48:47
 * @LastEditTime: 2021-01-03 23:24:12
 * @LastEditors: xuxiaowei
 * @Description:
 */

const { registerEnterKeyEvent, $ } = require("../../base/bind");
const store = require("../../base/store/index");
const { ipcRenderer } = require("electron");
const { ISTATUS } = require("../constants");

const dropdownBtn = $("dropdown_btn");
const mainInput = $("main_input");
const remarksInput = $("remarks_input");
const confirmBtn = $("confirm_btn");

const timeSet = [2, 3, 4, 6, 8, 10, 12];
let choiceDoc = null;
let tempTime = 0;

dropdownBtn.addEventListener("click", () => {
  // console.info("dakai ");
  choiceDoc = $("choice");
  let choicehtml = ``;
  timeSet.forEach((item, index) => {
    const params = "`" + item + "`";
    choicehtml += `<span class="timeset" onclick="onTimePress(${params})">${item}小时后</span>`;
  });
  choiceDoc.innerHTML = choicehtml;
  choiceDoc.className = `choice`;
});
registerEnterKeyEvent(mainInput, () => remarksInput.focus());
// registerEnterKeyEvent(remarksInput, confirmInput);
confirmBtn.addEventListener("click", confirmInput);

function onTimePress(time) {
  // console.info("time", time);
  if (choiceDoc) {
    choiceDoc.className = `choice hid`;
    dropdownBtn.innerHTML = time + "小时后";
    tempTime = time;
  }
}

function confirmInput() {
  if (mainInput.value.length === 0 && remarksInput.value.length === 0) {
    // alert("空");
  } else {
    if (tempTime === 0) {
      alert("Time Forget ?");
      // console.info("time", new Date().getTime());
      return;
    }
    const curTime = parseInt(new Date().getTime() / 1000);
    const realTime = curTime + tempTime * 60;
    store.addSingleData({
      title: mainInput.value,
      remarks: remarksInput.value,
      time: realTime,
      status: ISTATUS.TODO,
    });
    ipcRenderer.send("ipc_addtask_success");
  }
}
