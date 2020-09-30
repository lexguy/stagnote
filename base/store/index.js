/*
 * @Author: xuwei
 * @Date: 2020-09-30 14:50:45
 * @LastEditTime: 2020-09-30 16:05:15
 * @LastEditors: xuwei
 * @Description
 */
// electron 的数据存储文件

const Store = require("electron-store");
const { v4: uuidv4 } = require("uuid");

const key = "d_09_30";

class DataStore extends Store {
  constructor(setting) {
    super(setting);
    this.curData = this.get(key) || [];
  }

  saveDayData = () => {
    this.set(key, this.curData);
    return this;
  };

  getDayData = () => {
    return this.get(key);
  };

  addSingleData = ({ title, remarks }) => {
    const singData = {
      id: uuidv4(),
      title,
      remarks,
    };
    this.curData.push(singData);
    return this.saveDayData();
  };
}

module.exports = new DataStore({ name: "xuwei" });
