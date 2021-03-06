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
  responseToError: () => responseToError
});
var import_BadRequestError = __toModule(require("../BadRequestError"));
var import_GatewayTimeoutError = __toModule(require("../GatewayTimeoutError"));
var import_NotFoundError = __toModule(require("../NotFoundError"));
var import_SchemaMissingError = __toModule(require("../SchemaMissingError"));
var import_ServerError = __toModule(require("../ServerError"));
var import_UnauthorizedError = __toModule(require("../UnauthorizedError"));
var import_UsageExceededError = __toModule(require("../UsageExceededError"));
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
async function responseToError(response, clientVersion) {
  var _a, _b, _c, _d, _e;
  if (response.ok)
    return void 0;
  const info = { clientVersion, response };
  if (response.status === 400) {
    let knownError;
    try {
      const body = await response.json();
      knownError = (_b = (_a = body == null ? void 0 : body.EngineNotStarted) == null ? void 0 : _a.reason) == null ? void 0 : _b.KnownEngineStartupError;
    } catch (_) {
    }
    if (knownError) {
      throw new import_BadRequestError.BadRequestError(info, knownError.msg, knownError.error_code);
    }
  }
  if (response.status === 401) {
    throw new import_UnauthorizedError.UnauthorizedError(info);
  }
  if (response.status === 404) {
    try {
      const body = await response.json();
      const isSchemaMissing = ((_c = body == null ? void 0 : body.EngineNotStarted) == null ? void 0 : _c.reason) === "SchemaMissing";
      return isSchemaMissing ? new import_SchemaMissingError.SchemaMissingError(info) : new import_NotFoundError.NotFoundError(info);
    } catch (err) {
      return new import_NotFoundError.NotFoundError(info);
    }
  }
  if (response.status === 429) {
    throw new import_UsageExceededError.UsageExceededError(info);
  }
  if (response.status === 504) {
    throw new import_GatewayTimeoutError.GatewayTimeoutError(info);
  }
  if (response.status >= 500) {
    let body;
    try {
      body = await response.json();
    } catch (err) {
      throw new import_ServerError.ServerError(info);
    }
    if (typeof ((_d = body == null ? void 0 : body.EngineNotStarted) == null ? void 0 : _d.reason) === "string") {
      throw new import_ServerError.ServerError(info, body.EngineNotStarted.reason);
    } else if (typeof ((_e = body == null ? void 0 : body.EngineNotStarted) == null ? void 0 : _e.reason) === "object") {
      const keys = Object.keys(body.EngineNotStarted.reason);
      if (keys.length > 0) {
        const reason = body.EngineNotStarted.reason;
        const content = reason[keys[0]];
        throw new import_ServerError.ServerError(info, keys[0], content.logs);
      }
    }
    throw new import_ServerError.ServerError(info);
  }
  if (response.status >= 400) {
    throw new import_BadRequestError.BadRequestError(info);
  }
  return void 0;
}
__name(responseToError, "responseToError");
__name2(responseToError, "responseToError");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  responseToError
});
