/*
 * @Author: xuwei
 * @Date: 2020-09-30 14:50:45
 * @LastEditTime: 2020-10-13 23:06:51
 * @LastEditors: xuwei
 * @Description
 */

/**
 * 数据存储文件
 * 每个月为一个JSON文件，JSON中按每天时间来标记数组  m2020_9.json
 * status  0-新的  -1-舍弃   1-已完成
 * time 时间戳 秒
 * 
{
  d10_10:{
    todo:[{id,title,remarks,time,status},],
    finish:[],
    abandon:[]
  },
  d10_11:{
    todo:[]...
  }
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

const curDaykey = keyName;

const initDayData = {
  todo: [],
  finish: [],
  abandon: [],
};

// 改变curData变量之后set到store保存，下次使用通过get从store取
// 避免直接直接使用curData成员变量，跨渲染进程读到的curData不一致（原因待查
class DataStore extends Store {
  constructor(setting) {
    super(setting);
    this.curData = this.getDayData();
  }

  saveDayData = (data) => {
    this.set(curDaykey, data);
    return this;
  };

  getDayData = () => {
    return this.get(curDaykey) || initDayData;
  };

  // 添加每条事务
  addSingleData = (item) => {
    const singleData = {
      id: uuidv4(),
      ...item,
    };
    this.curData.todo.push(singleData);
    this.saveDayData(this.curData);
  };

  // 改变该条状态
  changeItemStatus = (id, PRE_STATUS, NEXT_STATUS) => {
    const dayData = this.getDayData(); //跨渲染进程时需要重新读取
    const preKey = this._getTypeKey(PRE_STATUS);
    const nextKey = this._getTypeKey(NEXT_STATUS);
    const preList = dayData[preKey];
    const nextList = dayData[nextKey];
    const targetItem = preList.find((item) => item.id === id);
    targetItem.status = NEXT_STATUS;
    preList.splice(
      preList.findIndex((item) => item.id === id),
      1
    ); //旧列表删除该item
    dayData[nextKey] = this._insertListByTime(targetItem, nextList); //新列表添加该item
    return this.saveDayData(dayData);
  };

  // 根据状态获取对应列表的 key
  _getTypeKey = (status) => {
    let typeKey = "";
    if (status === ISTATUS.TODO) {
      typeKey = "todo";
    } else if (status === ISTATUS.FINISH) {
      typeKey = "finish";
    } else if (status === ISTATUS.ABANDON) {
      typeKey = "abandon";
    }
    return typeKey;
  };

  // 根据时间戳大小添加Item到List的正确位置
  _insertListByTime(item, list) {
    let index = 0;
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].time > item.time) {
          index = i;
          break;
        }
      }
      list.splice(index, 0, item);
    } else {
      list = [item];
    }
    return list;
  }
}

const store = new DataStore({ name: fileName });
module.exports = store;
