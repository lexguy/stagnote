/*
 * @Author: xuwei
 * @Date: 2020-09-29 12:29:23
 * @LastEditTime: 2020-12-28 01:48:24
 * @LastEditors: xuxiaowei
 * @Description:
 */

const { app, ipcRenderer } = require("electron");

const store = require("../../base/store/index");
const { $ } = require("../../base/bind");
const { ISTATUS } = require("../constants");
const { getHourAndMinute } = require("../../base/utils/strings");

const sendBtn = document.getElementById("send_notify");
const newTaskBtn = document.getElementById("add_new_task");

document.addEventListener("DOMContentLoaded", () => {
  // freshTodoList();
  freshAll();
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

ipcRenderer.on("ipc_addtask_fresh", () => {
  freshTodoList();
  freshTimeClock();
  // freshAll();
});

// 刷新提醒
function freshTimeClock() {
  const todoList = store.getDayData().todo;
  const firItem = todoList[0];
  const timeout = firItem.time - parseInt(new Date().getTime() / 1000);
  console.info("timeout", timeout);
  setTimeout(() => {
    const myNotification = new Notification(firItem.title, {
      body: firItem.remarks,
      timeoutType: "never",
      tag: "stag",
    });
  }, timeout * 1000);
}

//---------------舍弃 完成 的点击 start

function onTodoAbandonPress(id) {
  // console.info("abandon", id);
  store.changeItemStatus(id, ISTATUS.TODO, ISTATUS.ABANDON);
  freshTodoList();
  freshAbandonList();
}

function onTodoFinishPress(id) {
  // console.info("todo", id);
  store.changeItemStatus(id, ISTATUS.TODO, ISTATUS.FINISH);
  freshTodoList();
  freshFinishList();
}

// 重新打开
function onAbandonPress(id) {
  store.changeItemStatus(id, ISTATUS.ABANDON, ISTATUS.TODO);
  freshTodoList();
  freshAbandonList();
}

//--------------end

// ------fresh---------

function freshAll() {
  freshTodoList();
  freshFinishList();
  freshAbandonList();
}

// 刷新 Todo 列表
function freshTodoList() {
  const todoDoc = $("todo_list");
  const todoList = store.getDayData().todo;
  console.info("todoList", todoList);
  if (todoList.length > 0) {
    let todohtml = `<h4 class="cate_title">
    <i class="iconfont" id="todo_icon">&#xee6d;</i>
    TODO</h4><div class="list-group mb-4 mt-4" id="main_list">`;
    todoList.forEach((element) => {
      const params = "`" + element.id + "`";
      todohtml += `
      <div type="button" class="list-group-item">
        <div style="float: left"><h5>
        ${getHourAndMinute(element.time)}</h5></div>
        <div style="float: left">
          <h5 style="margin-left: 20px">${element.title}</h5>
          <span style="margin-left: 20px">${element.remarks}</span>
        </div>
        <span class="opebase" onclick="onTodoAbandonPress(${params})">舍弃</span>
        <span class="opebase" style="margin-right:10px" onclick="onTodoFinishPress(${params})">完成</span>
      </div>
    `;
    });
    todohtml += `</div>`;
    todoDoc.innerHTML = todohtml;
  } else {
    todoDoc.innerHTML = ``;
  }
}

function freshFinishList() {
  const finishDoc = $("finish_list");
  const finishList = store.getDayData().finish;
  if (finishList.length > 0) {
    let finishhtml = `<h4 class="cate_title">
    <i class="iconfont" id="todo_icon">&#xe610;</i>
    已完成</h4><div class="list-group mb-4 mt-4" id="main_list">`;
    finishList.forEach((element) => {
      const params = "`" + element.id + "`";
      finishhtml += `
      <div type="button" class="list-group-item">
        <div style="float: left"><h5>12:30</h5></div>
        <div style="float: left">
          <h5 style="margin-left: 20px">${element.title}</h5>
          <span style="margin-left: 20px">${element.remarks}</span>
        </div>
        <i class="iconfont" id="todo_item_icon">&#xe63c;</i>

      </div>
    `;
    });
    finishhtml += `</div>`;
    finishDoc.innerHTML = finishhtml;
  }
}

function freshAbandonList() {
  const abandonDoc = $("abandon_list");
  const abandonList = store.getDayData().abandon;
  if (abandonList.length > 0) {
    let abandonhtml = `<h4 class="cate_title">
    <i class="iconfont" id="todo_icon">&#xe88b;</i>
    舍弃</h4><div class="list-group mb-4 mt-4" id="main_list">`;
    abandonList.forEach((element) => {
      const params = "`" + element.id + "`";
      abandonhtml += `
      <div type="button" class="list-group-item">
        <div style="float: left"><h5>12:30</h5></div>
        <div style="float: left">
          <h5 style="margin-left: 20px">${element.title}</h5>
          <span style="margin-left: 20px">${element.remarks}</span>
        </div>
        <span class="opebase ope_abandon textdel" onclick="onAbandonPress(${params})">已被舍弃</span>
      </div>
    `;
    });
    abandonhtml += `</div>`;
    abandonDoc.innerHTML = abandonhtml;
  } else {
    abandonDoc.innerHTML = ``;
  }
}

function initOperateEle() {
  const btnTodoFinish = document.querySelectorAll(
    "f_center .operate_btn .finish"
  );
  console.info("btn", btnTodoFinish);

  const btnTodoAbandon = $("todo_abandon");
  const btnAbandon = $("abandon");
}
