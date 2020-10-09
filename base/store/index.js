/*
 * @Author: xuwei
 * @Date: 2020-09-30 14:50:45
 * @LastEditTime: 2020-10-10 00:29:37
 * @LastEditors: xuwei
 * @Description
 */

/**
 * 数据存储文件
 * 每个月为一个JSON文件，JSON中按每天时间来标记数组  m2020_9.json
 * status  0-新的  -1-舍弃   1-已完成
{
  d09_30:[{id,title,remarks,time,status},{},{}]
  d10_01:[{id,title,remarks,time,status},{},{}]
  d10_02:[{id,title,remarks,time,status},{},{}]
}
 */

const Store = require("electron-store");
const { v4: uuidv4 } = require("uuid");
const { getDayKeyName, getJSONFileName } = require("../utils/strings");

const fileName = getJSONFileName();
const keyName = getDayKeyName();

// console.info("f", fileName);
// console.info("k", keyName);

const key = keyName;

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
    // console.info("list", this.get(key));
    return this.get(key) || [];
  };

  addSingleData = (item) => {
    const singData = {
      id: uuidv4(),
      ...item,
    };
    this.curData.push(singData);
    return this.saveDayData();
  };
}

const store = new DataStore({ name: fileName });
module.exports = store;
