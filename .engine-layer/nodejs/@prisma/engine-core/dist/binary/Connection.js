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
  Connection: () => Connection
});
var import_get_stream = __toModule(require("get-stream"));
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
const undici = /* @__PURE__ */ __name2(() => require("undici"), "undici");
function assertHasPool(pool) {
  if (pool === void 0) {
    throw new Error("Connection has not been opened");
  }
}
__name(assertHasPool, "assertHasPool");
__name2(assertHasPool, "assertHasPool");
class Connection {
  constructor() {
  }
  static async onHttpError(response, handler) {
    const _response = await response;
    if (_response.statusCode >= 400) {
      return handler(_response);
    }
    return _response;
  }
  open(url, options) {
    if (this._pool)
      return;
    this._pool = new (undici()).Pool(url, {
      connections: 1e3,
      keepAliveMaxTimeout: 6e5,
      headersTimeout: 0,
      bodyTimeout: 0,
      ...options
    });
  }
  async raw(method, endpoint, headers, body) {
    assertHasPool(this._pool);
    const response = await this._pool.request({
      path: endpoint,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body
    });
    const result = {
      statusCode: response.statusCode,
      headers: response.headers,
      data: JSON.parse(await (0, import_get_stream.default)(response.body))
    };
    return result;
  }
  post(endpoint, body, headers) {
    return this.raw("POST", endpoint, headers, body);
  }
  get(path, headers) {
    return this.raw("GET", path, headers);
  }
  close() {
    if (this._pool) {
      this._pool.close(() => {
      });
    }
    this._pool = void 0;
  }
}
__name(Connection, "Connection");
__name2(Connection, "Connection");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Connection
});
