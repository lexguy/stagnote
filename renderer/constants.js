/*
 * @Author: xuwei
 * @Date: 2020-10-09 17:48:15
 * @LastEditTime: 2020-10-09 17:50:33
 * @LastEditors: xuwei
 * @Description:
 */

//  每个事务项的状态
const ISTATUS = {
  ABANDON: -1,
  FINISH: 1,
  TODO: 0,
};

module.exports = {
  ISTATUS,
};
