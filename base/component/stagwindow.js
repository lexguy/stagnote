/*
 * @Author: xuwei
 * @Date: 2020-09-30 10:02:36
 * @LastEditTime: 2020-09-30 16:00:18
 * @LastEditors: xuwei
 * @Description:
 */
const { BrowserWindow } = require("electron");

class StagWindow extends BrowserWindow {
  constructor(setting, htmlPath) {
    const initSetting = {
      width: 600,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    };
    const finalSetting = Object.assign(initSetting, setting);
    super(finalSetting);
    this.loadFile(htmlPath);
    this.once("ready-to-show", () => {
      this.show();
    });
  }
}

module.exports = StagWindow;
