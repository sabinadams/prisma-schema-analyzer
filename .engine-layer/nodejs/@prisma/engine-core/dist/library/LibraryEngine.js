var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp2(target, "__esModule", { value: true });
var __name2 = (target, value) => __defProp2(target, "name", { value, configurable: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp2(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp2(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  LibraryEngine: () => LibraryEngine
});
var import_debug = __toModule(require("@prisma/debug"));
var import_engines = __toModule(require("@prisma/engines"));
var import_get_platform = __toModule(require("@prisma/get-platform"));
var import_chalk = __toModule(require("chalk"));
var import_events = __toModule(require("events"));
var import_fs = __toModule(require("fs"));
var import_path = __toModule(require("path"));
var import_Engine = __toModule(require("../common/Engine"));
var import_PrismaClientInitializationError = __toModule(require("../common/errors/PrismaClientInitializationError"));
var import_PrismaClientRustPanicError = __toModule(require("../common/errors/PrismaClientRustPanicError"));
var import_PrismaClientUnknownRequestError = __toModule(require("../common/errors/PrismaClientUnknownRequestError"));
var import_getErrorMessageWithLink = __toModule(require("../common/errors/utils/getErrorMessageWithLink"));
var import_prismaGraphQLToJSError = __toModule(require("../common/errors/utils/prismaGraphQLToJSError"));
var import_printGeneratorConfig = __toModule(require("../common/utils/printGeneratorConfig"));
var import_util = __toModule(require("../common/utils/util"));
var __defProp = Object.defineProperty;
var __name = /* @__PURE__ */ __name2((target, value) => __defProp(target, "name", { value, configurable: true }), "__name");
const debug = (0, import_debug.default)("prisma:client:libraryEngine");
function isQueryEvent(event) {
  return event["item_type"] === "query" && "query" in event;
}
__name2(isQueryEvent, "isQueryEvent");
__name(isQueryEvent, "isQueryEvent");
function isPanicEvent(event) {
  return event.level === "error" && event["message"] === "PANIC";
}
__name2(isPanicEvent, "isPanicEvent");
__name(isPanicEvent, "isPanicEvent");
const knownPlatforms = [...import_get_platform.platforms, "native"];
const engines = [];
class LibraryEngine extends import_Engine.Engine {
  constructor(config) {
    super();
    var _a, _b;
    this.datamodel = import_fs.default.readFileSync(config.datamodelPath, "utf-8");
    this.config = config;
    this.libraryStarted = false;
    this.logQueries = (_a = config.logQueries) != null ? _a : false;
    this.logLevel = (_b = config.logLevel) != null ? _b : "error";
    this.logEmitter = new import_events.default();
    this.logEmitter.on("error", (e) => {
    });
    this.datasourceOverrides = config.datasources ? this.convertDatasources(config.datasources) : {};
    if (config.enableDebugLogs) {
      this.logLevel = "debug";
    }
    this.libraryInstantiationPromise = this.instantiateLibrary();
    initHooks();
    engines.push(this);
    this.checkForTooManyEngines();
  }
  checkForTooManyEngines() {
    if (engines.length >= 10) {
      const runningEngines = engines.filter((e) => e.engine);
      if (runningEngines.length === 10) {
        console.warn(`${import_chalk.default.yellow("warn(prisma-client)")} There are already 10 instances of Prisma Client actively running.`);
      }
    }
  }
  async transaction(action, arg) {
    var _a, _b, _c, _d, _e;
    await this.start();
    let result;
    if (action === "start") {
      const jsonOptions = JSON.stringify({
        max_wait: (_a = arg == null ? void 0 : arg.maxWait) != null ? _a : 2e3,
        timeout: (_b = arg == null ? void 0 : arg.timeout) != null ? _b : 5e3
      });
      result = await ((_c = this.engine) == null ? void 0 : _c.startTransaction(jsonOptions, "{}"));
    } else if (action === "commit") {
      result = await ((_d = this.engine) == null ? void 0 : _d.commitTransaction(arg.id, "{}"));
    } else if (action === "rollback") {
      result = await ((_e = this.engine) == null ? void 0 : _e.rollbackTransaction(arg.id, "{}"));
    }
    const response = this.parseEngineResponse(result);
    if (response.error_code)
      throw response;
    return response;
  }
  async instantiateLibrary() {
    debug("internalSetup");
    if (this.libraryInstantiationPromise) {
      return this.libraryInstantiationPromise;
    }
    await (0, import_get_platform.isNodeAPISupported)();
    this.platform = await this.getPlatform();
    await this.loadEngine();
    this.version();
  }
  async getPlatform() {
    if (this.platform)
      return this.platform;
    const platform = await (0, import_get_platform.getPlatform)();
    if (!knownPlatforms.includes(platform)) {
      throw new import_PrismaClientInitializationError.PrismaClientInitializationError(`Unknown ${import_chalk.default.red("PRISMA_QUERY_ENGINE_LIBRARY")} ${import_chalk.default.redBright.bold(platform)}. Possible binaryTargets: ${import_chalk.default.greenBright(knownPlatforms.join(", "))} or a path to the query engine library.
You may have to run ${import_chalk.default.greenBright("prisma generate")} for your changes to take effect.`, this.config.clientVersion);
    }
    return platform;
  }
  parseEngineResponse(response) {
    if (!response) {
      throw new import_PrismaClientUnknownRequestError.PrismaClientUnknownRequestError(`Response from the Engine was empty`, this.config.clientVersion);
    }
    try {
      const config = JSON.parse(response);
      return config;
    } catch (err) {
      throw new import_PrismaClientUnknownRequestError.PrismaClientUnknownRequestError(`Unable to JSON.parse response from engine`, this.config.clientVersion);
    }
  }
  convertDatasources(datasources) {
    const obj = Object.create(null);
    for (const { name, url } of datasources) {
      obj[name] = url;
    }
    return obj;
  }
  async loadEngine() {
    var _a;
    if (!this.libQueryEnginePath) {
      this.libQueryEnginePath = await this.getLibQueryEnginePath();
    }
    debug(`loadEngine using ${this.libQueryEnginePath}`);
    if (!this.engine) {
      if (!this.QueryEngineConstructor) {
        try {
          this.library = eval("require")(this.libQueryEnginePath);
          this.QueryEngineConstructor = this.library.QueryEngine;
        } catch (e) {
          if (import_fs.default.existsSync(this.libQueryEnginePath)) {
            if (this.libQueryEnginePath.endsWith(".node")) {
              throw new import_PrismaClientInitializationError.PrismaClientInitializationError(`Unable to load Node-API Library from ${import_chalk.default.dim(this.libQueryEnginePath)}, Library may be corrupt`, this.config.clientVersion);
            } else {
              throw new import_PrismaClientInitializationError.PrismaClientInitializationError(`Expected an Node-API Library but received ${import_chalk.default.dim(this.libQueryEnginePath)}`, this.config.clientVersion);
            }
          } else {
            throw new import_PrismaClientInitializationError.PrismaClientInitializationError(`Unable to load Node-API Library from ${import_chalk.default.dim(this.libQueryEnginePath)}, It does not exist`, this.config.clientVersion);
          }
        }
      }
      if (this.QueryEngineConstructor) {
        try {
          this.engine = new this.QueryEngineConstructor({
            datamodel: this.datamodel,
            env: process.env,
            logQueries: (_a = this.config.logQueries) != null ? _a : false,
            ignoreEnvVarErrors: false,
            datasourceOverrides: this.datasourceOverrides,
            logLevel: this.logLevel,
            configDir: this.config.cwd
          }, (err, log) => this.logger(err, log));
        } catch (_e) {
          const e = _e;
          const error = this.parseInitError(e.message);
          if (typeof error === "string") {
            throw e;
          } else {
            throw new import_PrismaClientInitializationError.PrismaClientInitializationError(error.message, this.config.clientVersion, error.error_code);
          }
        }
      }
    }
  }
  logger(err, log) {
    var _a;
    if (err) {
      throw err;
    }
    const event = this.parseEngineResponse(log);
    if (!event)
      return;
    event.level = (_a = event == null ? void 0 : event.level.toLowerCase()) != null ? _a : "unknown";
    if (isQueryEvent(event)) {
      this.logEmitter.emit("query", {
        timestamp: new Date(),
        query: event.query,
        params: event.params,
        duration: Number(event.duration_ms),
        target: event.module_path
      });
    } else if (isPanicEvent(event)) {
      this.loggerRustPanic = new import_PrismaClientRustPanicError.PrismaClientRustPanicError(this.getErrorMessageWithLink(`${event.message}: ${event.reason} in ${event.file}:${event.line}:${event.column}`), this.config.clientVersion);
      this.logEmitter.emit("error", this.loggerRustPanic);
    } else {
      this.logEmitter.emit(event.level, {
        timestamp: new Date(),
        message: event.message,
        target: event.module_path
      });
    }
  }
  getErrorMessageWithLink(title) {
    var _a;
    return (0, import_getErrorMessageWithLink.getErrorMessageWithLink)({
      platform: this.platform,
      title,
      version: this.config.clientVersion,
      engineVersion: (_a = this.versionInfo) == null ? void 0 : _a.version,
      database: this.config.activeProvider,
      query: this.lastQuery
    });
  }
  parseInitError(str) {
    try {
      const error = JSON.parse(str);
      return error;
    } catch (e) {
    }
    return str;
  }
  parseRequestError(str) {
    try {
      const error = JSON.parse(str);
      return error;
    } catch (e) {
    }
    return str;
  }
  on(event, listener) {
    if (event === "beforeExit") {
      this.beforeExitListener = listener;
    } else {
      this.logEmitter.on(event, listener);
    }
  }
  async runBeforeExit() {
    debug("runBeforeExit");
    if (this.beforeExitListener) {
      try {
        await this.beforeExitListener();
      } catch (e) {
        console.error(e);
      }
    }
  }
  async start() {
    await this.libraryInstantiationPromise;
    await this.libraryStoppingPromise;
    if (this.libraryStartingPromise) {
      debug(`library already starting, this.libraryStarted: ${this.libraryStarted}`);
      return this.libraryStartingPromise;
    }
    if (!this.libraryStarted) {
      this.libraryStartingPromise = new Promise((resolve, reject) => {
        var _a;
        debug("library starting");
        (_a = this.engine) == null ? void 0 : _a.connect({ enableRawQueries: true }).then(() => {
          this.libraryStarted = true;
          debug("library started");
          resolve();
        }).catch((err) => {
          const error = this.parseInitError(err.message);
          if (typeof error === "string") {
            reject(err);
          } else {
            reject(new import_PrismaClientInitializationError.PrismaClientInitializationError(error.message, this.config.clientVersion, error.error_code));
          }
        }).finally(() => {
          this.libraryStartingPromise = void 0;
        });
      });
      return this.libraryStartingPromise;
    }
  }
  async stop() {
    await this.libraryStartingPromise;
    await this.executingQueryPromise;
    if (this.libraryStoppingPromise) {
      debug("library is already stopping");
      return this.libraryStoppingPromise;
    }
    if (this.libraryStarted) {
      this.libraryStoppingPromise = new Promise(async (resolve, reject) => {
        var _a;
        try {
          await new Promise((r) => setTimeout(r, 5));
          debug("library stopping");
          await ((_a = this.engine) == null ? void 0 : _a.disconnect());
          this.libraryStarted = false;
          this.libraryStoppingPromise = void 0;
          debug("library stopped");
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      return this.libraryStoppingPromise;
    }
  }
  getConfig() {
    return this.library.getConfig({
      datamodel: this.datamodel,
      datasourceOverrides: this.datasourceOverrides,
      ignoreEnvVarErrors: true,
      env: process.env
    });
  }
  version() {
    var _a, _b, _c;
    this.versionInfo = (_a = this.library) == null ? void 0 : _a.version();
    return (_c = (_b = this.versionInfo) == null ? void 0 : _b.version) != null ? _c : "unknown";
  }
  async request(query, headers = {}, numTry = 1) {
    var _a;
    debug(`sending request, this.libraryStarted: ${this.libraryStarted}`);
    const request = { query, variables: {} };
    const headerStr = JSON.stringify(headers);
    const queryStr = JSON.stringify(request);
    try {
      await this.start();
      this.executingQueryPromise = (_a = this.engine) == null ? void 0 : _a.query(queryStr, headerStr, headers.transactionId);
      this.lastQuery = queryStr;
      const data = this.parseEngineResponse(await this.executingQueryPromise);
      if (data.errors) {
        if (data.errors.length === 1) {
          throw (0, import_prismaGraphQLToJSError.prismaGraphQLToJSError)(data.errors[0], this.config.clientVersion);
        }
        throw new import_PrismaClientUnknownRequestError.PrismaClientUnknownRequestError(JSON.stringify(data.errors), this.config.clientVersion);
      } else if (this.loggerRustPanic) {
        throw this.loggerRustPanic;
      }
      return { data, elapsed: 0 };
    } catch (e) {
      if (e instanceof import_PrismaClientInitializationError.PrismaClientInitializationError) {
        throw e;
      }
      const error = this.parseRequestError(e.message);
      if (typeof error === "string") {
        throw e;
      } else {
        throw new import_PrismaClientUnknownRequestError.PrismaClientUnknownRequestError(`${error.message}
${error.backtrace}`, this.config.clientVersion);
      }
    }
  }
  async requestBatch(queries, headers = {}, transaction = false, numTry = 1) {
    debug("requestBatch");
    const request = {
      batch: queries.map((query) => ({ query, variables: {} })),
      transaction
    };
    await this.start();
    this.lastQuery = JSON.stringify(request);
    this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify(headers), headers.transactionId);
    const result = await this.executingQueryPromise;
    const data = this.parseEngineResponse(result);
    if (data.errors) {
      if (data.errors.length === 1) {
        throw (0, import_prismaGraphQLToJSError.prismaGraphQLToJSError)(data.errors[0], this.config.clientVersion);
      }
      throw new import_PrismaClientUnknownRequestError.PrismaClientUnknownRequestError(JSON.stringify(data.errors), this.config.clientVersion);
    }
    const { batchResult, errors } = data;
    if (Array.isArray(batchResult)) {
      return batchResult.map((result2) => {
        var _a;
        if (result2.errors) {
          return (_a = this.loggerRustPanic) != null ? _a : (0, import_prismaGraphQLToJSError.prismaGraphQLToJSError)(data.errors[0], this.config.clientVersion);
        }
        return {
          data: result2,
          elapsed: 0
        };
      });
    } else {
      if (errors && errors.length === 1) {
        throw new Error(errors[0].error);
      }
      throw new Error(JSON.stringify(data));
    }
  }
  async resolveEnginePath() {
    var _a, _b, _c, _d;
    const searchedLocations = [];
    let enginePath;
    if (this.libQueryEnginePath) {
      return { enginePath: this.libQueryEnginePath, searchedLocations };
    }
    this.platform = (_a = this.platform) != null ? _a : await (0, import_get_platform.getPlatform)();
    if (__filename.includes("LibraryEngine")) {
      enginePath = import_path.default.join((0, import_engines.getEnginesPath)(), (0, import_get_platform.getNodeAPIName)(this.platform, "fs"));
      return { enginePath, searchedLocations };
    }
    const searchLocations = [
      eval(`require('path').join(__dirname, '../../../.prisma/client')`),
      (_d = (_c = (_b = this.config.generator) == null ? void 0 : _b.output) == null ? void 0 : _c.value) != null ? _d : eval("__dirname"),
      import_path.default.join(eval("__dirname"), ".."),
      import_path.default.dirname(this.config.datamodelPath),
      this.config.cwd,
      "/tmp/prisma-engines"
    ];
    if (this.config.dirname) {
      searchLocations.push(this.config.dirname);
    }
    for (const location of searchLocations) {
      searchedLocations.push(location);
      debug(`Searching for Query Engine Library in ${location}`);
      enginePath = import_path.default.join(location, (0, import_get_platform.getNodeAPIName)(this.platform, "fs"));
      if (import_fs.default.existsSync(enginePath)) {
        return { enginePath, searchedLocations };
      }
    }
    enginePath = import_path.default.join(__dirname, (0, import_get_platform.getNodeAPIName)(this.platform, "fs"));
    return { enginePath: enginePath != null ? enginePath : "", searchedLocations };
  }
  async getLibQueryEnginePath() {
    var _a, _b, _c, _d;
    const libPath = (_a = process.env.PRISMA_QUERY_ENGINE_LIBRARY) != null ? _a : this.config.prismaPath;
    if (libPath && import_fs.default.existsSync(libPath) && libPath.endsWith(".node")) {
      return libPath;
    }
    this.platform = (_b = this.platform) != null ? _b : await (0, import_get_platform.getPlatform)();
    const { enginePath: enginePath2, searchedLocations: searchedLocations2 } = await this.resolveEnginePath();
    if (!import_fs.default.existsSync(enginePath2)) {
      const incorrectPinnedPlatformErrorStr = this.platform ? `
You incorrectly pinned it to ${import_chalk.default.redBright.bold(`${this.platform}`)}
` : "";
      let errorText = `Query engine library for current platform "${import_chalk.default.bold(this.platform)}" could not be found.${incorrectPinnedPlatformErrorStr}
This probably happens, because you built Prisma Client on a different platform.
(Prisma Client looked in "${import_chalk.default.underline(enginePath2)}")

Searched Locations:

${searchedLocations2.map((f) => {
        let msg = `  ${f}`;
        if (process.env.DEBUG === "node-engine-search-locations" && import_fs.default.existsSync(f)) {
          const dir = import_fs.default.readdirSync(f);
          msg += dir.map((d) => `    ${d}`).join("\n");
        }
        return msg;
      }).join("\n" + (process.env.DEBUG === "node-engine-search-locations" ? "\n" : ""))}
`;
      if (this.config.generator) {
        this.platform = (_c = this.platform) != null ? _c : await (0, import_get_platform.getPlatform)();
        if (this.config.generator.binaryTargets.find((object) => object.value === this.platform) || this.config.generator.binaryTargets.find((object) => object.value === "native")) {
          errorText += `
You already added the platform${this.config.generator.binaryTargets.length > 1 ? "s" : ""} ${this.config.generator.binaryTargets.map((t) => `"${import_chalk.default.bold(t.value)}"`).join(", ")} to the "${import_chalk.default.underline("generator")}" block
in the "schema.prisma" file as described in https://pris.ly/d/client-generator,
but something went wrong. That's suboptimal.

Please create an issue at https://github.com/prisma/prisma/issues/new`;
          errorText += ``;
        } else {
          errorText += `

To solve this problem, add the platform "${this.platform}" to the "${import_chalk.default.underline("binaryTargets")}" attribute in the "${import_chalk.default.underline("generator")}" block in the "schema.prisma" file:
${import_chalk.default.greenBright(this.getFixedGenerator())}

Then run "${import_chalk.default.greenBright("prisma generate")}" for your changes to take effect.
Read more about deploying Prisma Client: https://pris.ly/d/client-generator`;
        }
      } else {
        errorText += `

Read more about deploying Prisma Client: https://pris.ly/d/client-generator
`;
      }
      throw new import_PrismaClientInitializationError.PrismaClientInitializationError(errorText, this.config.clientVersion);
    }
    this.platform = (_d = this.platform) != null ? _d : await (0, import_get_platform.getPlatform)();
    return enginePath2;
  }
  getFixedGenerator() {
    const fixedGenerator = {
      ...this.config.generator,
      binaryTargets: (0, import_util.fixBinaryTargets)(this.config.generator.binaryTargets, this.platform)
    };
    return (0, import_printGeneratorConfig.printGeneratorConfig)(fixedGenerator);
  }
}
__name2(LibraryEngine, "LibraryEngine");
__name(LibraryEngine, "LibraryEngine");
function hookProcess(handler, exit = false) {
  process.once(handler, async () => {
    debug(`hookProcess received: ${handler}`);
    for (const engine of engines) {
      await engine.runBeforeExit();
    }
    engines.splice(0, engines.length);
    if (exit && process.listenerCount(handler) === 0) {
      process.exit();
    }
  });
}
__name2(hookProcess, "hookProcess");
__name(hookProcess, "hookProcess");
let hooksInitialized = false;
function initHooks() {
  if (!hooksInitialized) {
    hookProcess("beforeExit");
    hookProcess("exit");
    hookProcess("SIGINT", true);
    hookProcess("SIGUSR2", true);
    hookProcess("SIGTERM", true);
    hooksInitialized = true;
  }
}
__name2(initHooks, "initHooks");
__name(initHooks, "initHooks");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LibraryEngine
});
