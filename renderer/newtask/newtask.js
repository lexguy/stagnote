/*
 * @Author: xuwei
 * @Date: 2020-09-30 09:48:47
 * @LastEditTime: 2020-09-30 18:10:02
 * @LastEditors: xuwei
 * @Description:
 */

const { registerEnterKeyEvent, $ } = require("../../base/bind");
const store = require("../../base/store/index");
const { ipcRenderer } = require("electron");

const dropdownBtn = $("dropdown_btn");
const mainInput = $("main_input");
const remarksInput = $("remarks_input");
const confirmBtn = $("confirm_btn");

dropdownBtn.addEventListener("click", () => {
  console.info("dakai ");
});
registerEnterKeyEvent(mainInput, () => remarksInput.focus());
registerEnterKeyEvent(remarksInput, confirmInput);
confirmBtn.addEventListener("click", confirmInput);

function confirmInput() {
  if (mainInput.value.length === 0 && remarksInput.value.length === 0) {
    // alert("空");
  } else {
    // store.addSingleData({
    //   title: mainInput.value,
    //   remarks: remarksInput.value,
    // });
    ipcRenderer.send("ipc_close_new_task");
  }
}
