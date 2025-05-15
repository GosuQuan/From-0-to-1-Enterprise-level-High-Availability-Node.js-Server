// src/moulds/ShopForm.browser.js
// 浏览器版本的表单验证

// 使用全局的 yup 对象
const Yup = window.yup;

// 导出到全局 moulds 命名空间
window.moulds = window.moulds || {};
window.moulds.createShopFormSchema = () =>
  Yup.object({
    name: Yup.string()
      .required('店铺名不能为空')
      .min(3, '店铺名至少 3 个字符')
      .max(120, '店铺名不可超过 120 字'),
  });
