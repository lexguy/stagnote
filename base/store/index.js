/*
 * @Author: xuwei
 * @Date: 2020-09-30 14:50:45
 * @LastEditTime: 2020-10-13 10:46:57
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
const { ISTATUS } = require("../../renderer/constants");
const { getDayKeyName, getJSONFileName } = require("../utils/strings");

const fileName = getJSONFileName();
const keyName = getDayKeyName();

// console.info("f", fileName);
// console.info("k", keyName);

const key = keyName;

// 改变curData变量之后set到store保存，下次使用通过get从store取
// 避免直接直接使用curData成员变量，跨渲染进程读到的curData不一致（原因待查
class DataStore extends Store {
  constructor(setting) {
    super(setting);
    this.curData = this.getDayData();
  }

  saveDayData = (data) => {
    this.set(key, data);
    return this;
  };

  getDayData = () => {
    // console.info("list", this.get(key));
    return this.get(key) || [];
  };

  // 添加每条事务
  addSingleData = (item) => {
    const singleData = {
      id: uuidv4(),
      ...item,
    };
    this.curData.push(singleData);
    this.saveDayData(this.curData);
  };

  // 改变该条状态
  changeItemStatus = (id, STATUS) => {
    const storeData = this.getDayData(); //跨渲染进程时需要重新读取
    const target = storeData.find((item) => item.id === id);
    // console.info("target", target);
    target.status = STATUS;
    return this.saveDayData(storeData);
  };
}

const store = new DataStore({ name: fileName });
module.exports = store;
