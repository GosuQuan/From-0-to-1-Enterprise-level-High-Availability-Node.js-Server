// src/services/shop.js
const {Shop} = require('../models')
  class ShopService {

    async create({values}){
      return await Shop.create(values);
    }
    async init() {}
  
    async find({ id, pageIndex = 0, pageSize = 10 }) {
  
      if (id) {
       return [await Shop.findByPk(id)]
      }
  
      return  await Shop.findAll({
           offset: pageIndex * pageSize,
              limit: pageSize,
            });
    }
    async modify({ id, values }) {
  
      const target = await Shop.findByPk(id);
  
      if (!target) {
        return null;
      }
  
      Object.assign(target, values);
      return await target.save()
    }
  
    async remove({ id }) {
      const target = await Shop.findByPk(id);
  
      if (!target) {
        return false;
      }
  
      return target.destroy();
    }
  }
  
  // 单例模式
  let service;
  module.exports = async function () {
    if (!service) {
      service = new ShopService();
      await service.init();
    }
    return service;
  };