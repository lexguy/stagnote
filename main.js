/*
 * @Author: xuwei
 * @Date: 2020-08-10 12:33:53
 * @LastEditTime: 2020-10-11 21:41:25
 * @LastEditors: xuwei
 * @Description:
 */
const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const StagWindow = require("./base/component/stagwindow");

// app.setAppUserModelId(process.execPath);

console.info("lujing", app.getPath("userData"));

let baseWin = null;
function createWindow() {
  // 创建浏览器窗口
  baseWin = new StagWindow(
    { width: 800, height: 600 },
    "./renderer/index/index.html"
  );

  // 主进程消息

  // const myNotification = new Notification({
  //   title: "22",
  //   body: "Lorem Ipsum Dolor Sit Amet",
  // });
  // myNotification.show();

  // 打开开发者工具
  // win.webContents.openDevTools();
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow);

//当所有窗口都被关闭后退出
app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//-----------------------------code----------------------------

app.setAppUserModelId("stagnote");

let newTaskWindow = null;
ipcMain.on("ipc_create_task_window", () => {
  newTaskWindow = new StagWindow(
    { width: 600, height: 300 },
    "./renderer/newtask/newtask.html"
  );
});
ipcMain.on("ipc_close_new_task", (event) => {
  baseWin.webContents.send("ipc_addtask_fresh");
  newTaskWindow && newTaskWindow.close();
});
