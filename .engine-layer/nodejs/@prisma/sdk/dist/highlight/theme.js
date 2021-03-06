var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  blue: () => blue,
  brightBlue: () => brightBlue,
  darkBrightBlue: () => darkBrightBlue,
  gamboge: () => gamboge,
  identity: () => identity,
  theme: () => theme
});
var import_chalk = __toModule(require("chalk"));
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
const gamboge = import_chalk.default.rgb(228, 155, 15);
const darkBrightBlue = import_chalk.default.rgb(107, 139, 140);
const blue = import_chalk.default.cyan;
const brightBlue = import_chalk.default.rgb(127, 155, 175);
const identity = /* @__PURE__ */ __name2((str) => str || "", "identity");
const theme = {
  keyword: blue,
  entity: blue,
  value: brightBlue,
  punctuation: darkBrightBlue,
  directive: blue,
  function: blue,
  variable: brightBlue,
  string: brightBlue,
  boolean: gamboge,
  comment: import_chalk.default.dim
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blue,
  brightBlue,
  darkBrightBlue,
  gamboge,
  identity,
  theme
});
