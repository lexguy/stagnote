/*
 * @Author: xuwei
 * @Date: 2020-09-29 12:29:23
 * @LastEditTime: 2020-10-09 18:35:46
 * @LastEditors: xuwei
 * @Description:
 */

const { app, ipcRenderer } = require("electron");

const store = require("../../base/store/index");
const { $ } = require("../../base/bind");
const { ISTATUS } = require("../constants");

const sendBtn = document.getElementById("send_notify");
const newTaskBtn = document.getElementById("add_new_task");

document.addEventListener("DOMContentLoaded", () => {
  freshTodoList();
});

sendBtn.addEventListener("click", () => {
  // 需要打开系统通知权限才能收到  win10 设置   Mac 允许
  const myNotification = new Notification("Title", {
    body: "Lorem Ipsum Dolor Sit Amet",
    timeoutType: "never",
    tag: "stag",
  });

  myNotification.onclick = () => {
    console.log("Notification clicked");
  };
});

newTaskBtn.addEventListener("click", () => {
  ipcRenderer.send("ipc_create_task_window");
});

ipcRenderer.on("fresh_list", () => {
  freshTodoList();
});

function freshTodoList() {
  const list = store.getDayData();
  // console.info("list", list);
  let html = `<div class="list-group mt-4" id="main_list">`;
  const time = "12.30";
  list.forEach((element) => {
    // html += ` <button type="button" class="list-group-item list-group-item-action">${element.title}</button>`;
    html += `<button type="button" class="list-group-item list-group-item-action">
      <div style="float: left">
        <h5>${time}</h5>
      </div>
      <div style="float: left">
        <h5 style="margin-left: 20px">${element.title}</h5>
        <span style="margin-left: 20px">${element.remarks}</span>
      </div>`;
    if (element.status === ISTATUS.TODO) {
      html += `<div class="f_center operate_btn" id="todo_finish_${element.id}">
      <span style="color: blanchedalmond">完成</span>
      </div>
      <div class="f_center operate_btn" id="todo_abandon">
        <span style="color: blanchedalmond">舍弃</span>
      </div>`;
    } else if (element.status === ISTATUS.FINISH) {
      html += `<div class="f_center operate_btn" id="finish">
      <span style="color: blanchedalmond">已完成</span>
      </div>`;
    } else if (element.status === ISTATUS.ABANDON) {
      html += `<div class="f_center operate_btn" id="abandon">
      <span style="color: blanchedalmond">已被舍弃</span>
      </div>`;
    }
    html += `</button>`;
  });
  const listDoc = $("main_list");
  listDoc.innerHTML = html;
  setTimeout(() => {
    initOperateEle();
  }, 0);
}

//---------------舍弃 完成 的点击---------------------

function initOperateEle() {
  const btnTodoFinish = $("todo_finish");
  const btnTodoAbandon = $("todo_abandon");
  const btnAbandon = $("abandon");

  btnTodoAbandon.addEventListener("click", () => {
    // console.info("舍弃点击");
  });
  btnTodoFinish.addEventListener("click", () => {
    console.info("完成点击");
  });
}
