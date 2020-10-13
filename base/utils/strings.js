/*
 * @Author: xuwei
 * @Date: 2020-10-09 09:12:33
 * @LastEditTime: 2020-10-13 23:03:38
 * @LastEditors: xuwei
 * @Description:
 */

const dayjs = require("dayjs");

function getJSONFileName() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fileName = "m" + year + "_" + (month > 9 ? month : "0" + month);
  return fileName;
}

function getDayKeyName() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const keyName =
    "d" + (month > 9 ? month : "0" + month) + "_" + (day > 9 ? day : "0" + day);
  return keyName;
}

function getHourAndMinute(stamp) {
  const dj = dayjs(stamp * 1000);
  return dj.format("HH:mm");
}

module.exports = {
  getJSONFileName,
  getDayKeyName,
  getHourAndMinute,
};
