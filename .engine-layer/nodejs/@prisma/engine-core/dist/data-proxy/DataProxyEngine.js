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
  DataProxyEngine: () => DataProxyEngine
});
var import_events = __toModule(require("events"));
var import_Engine = __toModule(require("../common/Engine"));
var import_prismaGraphQLToJSError = __toModule(require("../common/errors/utils/prismaGraphQLToJSError"));
var import_DataProxyError = __toModule(require("./errors/DataProxyError"));
var import_ForcedRetryError = __toModule(require("./errors/ForcedRetryError"));
var import_InvalidDatasourceError = __toModule(require("./errors/InvalidDatasourceError"));
var import_NotImplementedYetError = __toModule(require("./errors/NotImplementedYetError"));
var import_SchemaMissingError = __toModule(require("./errors/SchemaMissingError"));
var import_responseToError = __toModule(require("./errors/utils/responseToError"));
var import_backOff = __toModule(require("./utils/backOff"));
var import_getClientVersion = __toModule(require("./utils/getClientVersion"));
var import_request = __toModule(require("./utils/request"));
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
const MAX_RETRIES = 10;
class DataProxyEngine extends import_Engine.Engine {
  constructor(config) {
    super();
    var _a, _b, _c, _d, _e;
    this.config = config;
    this.env = (_a = this.config.env) != null ? _a : {};
    this.inlineSchema = (_b = config.inlineSchema) != null ? _b : "";
    this.inlineDatasources = (_c = config.inlineDatasources) != null ? _c : {};
    this.inlineSchemaHash = (_d = config.inlineSchemaHash) != null ? _d : "";
    this.clientVersion = (_e = config.clientVersion) != null ? _e : "unknown";
    this.logEmitter = new import_events.default();
    this.logEmitter.on("error", () => {
    });
    const [host, apiKey] = this.extractHostAndApiKey();
    this.remoteClientVersion = (0, import_getClientVersion.getClientVersion)(this.config);
    this.headers = { Authorization: `Bearer ${apiKey}` };
    this.host = host;
    const promise = Promise.resolve();
    this.pushPromise = promise.then(() => this.pushSchema());
  }
  async pushSchema() {
    const response = await (0, import_request.request)(this.url("schema"), {
      method: "GET",
      headers: this.headers
    });
    if (response.status === 404) {
      await this.uploadSchema();
    }
  }
  version() {
    return "unknown";
  }
  async start() {
  }
  async stop() {
  }
  on(event, listener) {
    if (event === "beforeExit") {
      throw new import_NotImplementedYetError.NotImplementedYetError("beforeExit event is not yet supported", {
        clientVersion: this.clientVersion
      });
    } else {
      this.logEmitter.on(event, listener);
    }
  }
  url(s) {
    return `https://${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${s}`;
  }
  async getConfig() {
    return Promise.resolve({
      datasources: [
        {
          activeProvider: this.config.activeProvider
        }
      ]
    });
  }
  async uploadSchema() {
    const response = await (0, import_request.request)(this.url("schema"), {
      method: "PUT",
      headers: this.headers,
      body: this.inlineSchema
    });
    const err = await (0, import_responseToError.responseToError)(response, this.clientVersion);
    if (err) {
      this.logEmitter.emit("warn", { message: `Error while uploading schema: ${err.message}` });
      throw err;
    } else {
      this.logEmitter.emit("info", {
        message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`
      });
    }
  }
  request(query, headers, attempt = 0) {
    this.logEmitter.emit("query", { query });
    return this.requestInternal({ query, variables: {} }, headers, attempt);
  }
  async requestBatch(queries, headers, isTransaction = false, attempt = 0) {
    this.logEmitter.emit("query", {
      query: `Batch${isTransaction ? " in transaction" : ""} (${queries.length}):
${queries.join("\n")}`
    });
    const body = {
      batch: queries.map((query) => ({ query, variables: {} })),
      transaction: isTransaction
    };
    const { batchResult } = await this.requestInternal(body, headers, attempt);
    return batchResult;
  }
  async requestInternal(body, headers, attempt) {
    var _a;
    await this.pushPromise;
    try {
      this.logEmitter.emit("info", {
        message: `Calling ${this.url("graphql")} (n=${attempt})`
      });
      const response = await (0, import_request.request)(this.url("graphql"), {
        method: "POST",
        headers: { ...headers, ...this.headers },
        body: JSON.stringify(body)
      });
      const err = await (0, import_responseToError.responseToError)(response, this.clientVersion);
      if (err instanceof import_SchemaMissingError.SchemaMissingError) {
        await this.uploadSchema();
        throw new import_ForcedRetryError.ForcedRetryError({
          clientVersion: this.clientVersion,
          cause: err
        });
      }
      if (err) {
        throw err;
      }
      const data = await response.json();
      if (data.errors) {
        if (data.errors.length === 1) {
          throw (0, import_prismaGraphQLToJSError.prismaGraphQLToJSError)(data.errors[0], this.config.clientVersion);
        }
      }
      return data;
    } catch (err) {
      this.logEmitter.emit("error", {
        message: `Error while querying: ${(_a = err.message) != null ? _a : "(unknown)"}`
      });
      if (!(err instanceof import_DataProxyError.DataProxyError)) {
        throw err;
      }
      if (!err.isRetryable) {
        throw err;
      }
      if (attempt >= MAX_RETRIES) {
        if (err instanceof import_ForcedRetryError.ForcedRetryError) {
          throw err.cause;
        } else {
          throw err;
        }
      }
      this.logEmitter.emit("warn", { message: "This request can be retried" });
      const delay = await (0, import_backOff.backOff)(attempt);
      this.logEmitter.emit("warn", { message: `Retrying after ${delay}ms` });
      return this.requestInternal(body, headers, attempt + 1);
    }
  }
  transaction() {
    throw new import_NotImplementedYetError.NotImplementedYetError("Interactive transactions are not yet supported", {
      clientVersion: this.clientVersion
    });
  }
  extractHostAndApiKey() {
    const mainDatasourceName = Object.keys(this.inlineDatasources)[0];
    const mainDatasource = this.inlineDatasources[mainDatasourceName];
    const mainDatasourceURL = mainDatasource == null ? void 0 : mainDatasource.url.value;
    const mainDatasourceEnv = mainDatasource == null ? void 0 : mainDatasource.url.fromEnvVar;
    const loadedEnvURL = this.env[mainDatasourceEnv];
    const dataProxyURL = mainDatasourceURL != null ? mainDatasourceURL : loadedEnvURL;
    let url;
    try {
      url = new URL(dataProxyURL != null ? dataProxyURL : "");
    } catch (e) {
      throw new import_InvalidDatasourceError.InvalidDatasourceError("Could not parse URL of the datasource", {
        clientVersion: this.clientVersion
      });
    }
    const { protocol, host, searchParams } = url;
    if (protocol !== "prisma:") {
      throw new import_InvalidDatasourceError.InvalidDatasourceError("Datasource URL should use prisma:// protocol. If you are not using the Data Proxy, remove the `dataProxy` from the `previewFeatures` in your schema and ensure that `PRISMA_CLIENT_ENGINE_TYPE` environment variable is not set to `dataproxy`.", {
        clientVersion: this.clientVersion
      });
    }
    const apiKey = searchParams.get("api_key");
    if (apiKey === null || apiKey.length < 1) {
      throw new import_InvalidDatasourceError.InvalidDatasourceError("No valid API key found in the datasource URL", {
        clientVersion: this.clientVersion
      });
    }
    return [host, apiKey];
  }
}
__name(DataProxyEngine, "DataProxyEngine");
__name2(DataProxyEngine, "DataProxyEngine");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataProxyEngine
});
