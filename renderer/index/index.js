/*
 * @Author: xuwei
 * @Date: 2020-09-29 12:29:23
 * @LastEditTime: 2020-09-30 18:28:24
 * @LastEditors: xuwei
 * @Description:
 */

const { app, ipcRenderer } = require("electron");

const sendBtn = document.getElementById("send_notify");
const newTaskBtn = document.getElementById("add_new_task");
const store = require("../../base/store/index");
const { $ } = require("../../base/bind");

sendBtn.addEventListener("click", () => {
  // 需要打开系统通知权限才能收到  win10 设置   Mac 允许
  const myNotification = new Notification("Title", {
    body: "Lorem Ipsum Dolor Sit Amet",
    // timeoutType: "never",
  });

  myNotification.onclick = () => {
    console.log("Notification clicked");
  };
});

newTaskBtn.addEventListener("click", () => {
  ipcRenderer.send("ipc_create_task_window");
});

ipcRenderer.on("fresh_list", () => {
  const list = store.getDayData();
  console.info("list", list);
  let html = `<div class="list-group mt-4" id="main_list">`;
  list.forEach((element) => {
    html += ` <button type="button" class="list-group-item list-group-item-action">${element.title}</button>`;
  });
  const listDoc = $("main_list");
  listDoc.innerHTML = html;
});
