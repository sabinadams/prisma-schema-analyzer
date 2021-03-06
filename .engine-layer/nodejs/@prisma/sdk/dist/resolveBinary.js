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
  BinaryType: () => import_fetch_engine.BinaryType,
  engineEnvVarMap: () => engineEnvVarMap,
  maybeCopyToTmp: () => maybeCopyToTmp,
  resolveBinary: () => resolveBinary
});
var import_debug = __toModule(require("@prisma/debug"));
var import_engine_core = __toModule(require("@prisma/engine-core"));
var import_engines = __toModule(require("@prisma/engines"));
var import_fetch_engine = __toModule(require("@prisma/fetch-engine"));
var import_get_platform = __toModule(require("@prisma/get-platform"));
var import_fs = __toModule(require("fs"));
var import_make_dir = __toModule(require("make-dir"));
var import_path = __toModule(require("path"));
var import_temp_dir = __toModule(require("temp-dir"));
var import_util = __toModule(require("util"));
var __defProp = Object.defineProperty;
var __name = /* @__PURE__ */ __name2((target, value) => __defProp(target, "name", { value, configurable: true }), "__name");
const readFile = (0, import_util.promisify)(import_fs.default.readFile);
const writeFile = (0, import_util.promisify)(import_fs.default.writeFile);
const debug = (0, import_debug.default)("prisma:resolveBinary");
async function getBinaryName(name) {
  const platform = await (0, import_get_platform.getPlatform)();
  const extension = platform === "windows" ? ".exe" : "";
  if (name === import_fetch_engine.BinaryType.libqueryEngine) {
    return (0, import_get_platform.getNodeAPIName)(platform, "fs");
  }
  return `${name}-${platform}${extension}`;
}
__name2(getBinaryName, "getBinaryName");
__name(getBinaryName, "getBinaryName");
const engineEnvVarMap = {
  [import_fetch_engine.BinaryType.queryEngine]: "PRISMA_QUERY_ENGINE_BINARY",
  [import_fetch_engine.BinaryType.libqueryEngine]: "PRISMA_QUERY_ENGINE_LIBRARY",
  [import_fetch_engine.BinaryType.migrationEngine]: "PRISMA_MIGRATION_ENGINE_BINARY",
  [import_fetch_engine.BinaryType.introspectionEngine]: "PRISMA_INTROSPECTION_ENGINE_BINARY",
  [import_fetch_engine.BinaryType.prismaFmt]: "PRISMA_FMT_BINARY"
};
async function resolveBinary(name, proposedPath) {
  if (proposedPath && !proposedPath.startsWith("/snapshot/") && import_fs.default.existsSync(proposedPath)) {
    return proposedPath;
  }
  const envVar = engineEnvVarMap[name];
  if (process.env[envVar]) {
    if (!import_fs.default.existsSync(process.env[envVar])) {
      throw new Error(`Env var ${envVar} is provided, but provided path ${process.env[envVar]} can't be resolved.`);
    }
    return process.env[envVar];
  }
  const binaryName = await getBinaryName(name);
  const prismaPath = import_path.default.join((0, import_engines.getEnginesPath)(), binaryName);
  if (import_fs.default.existsSync(prismaPath)) {
    return maybeCopyToTmp(prismaPath);
  }
  const prismaPath2 = import_path.default.join(__dirname, "..", binaryName);
  if (import_fs.default.existsSync(prismaPath2)) {
    return maybeCopyToTmp(prismaPath2);
  }
  const prismaPath3 = import_path.default.join(__dirname, "../..", binaryName);
  if (import_fs.default.existsSync(prismaPath3)) {
    return maybeCopyToTmp(prismaPath3);
  }
  const prismaPath4 = import_path.default.join(__dirname, "../runtime", binaryName);
  if (import_fs.default.existsSync(prismaPath4)) {
    return maybeCopyToTmp(prismaPath4);
  }
  throw new Error(`Could not find ${name} binary. Searched in:
- ${prismaPath}
- ${prismaPath2}
- ${prismaPath3}
- ${prismaPath4}`);
}
__name2(resolveBinary, "resolveBinary");
__name(resolveBinary, "resolveBinary");
async function maybeCopyToTmp(file) {
  const dir = eval("__dirname");
  if (dir.startsWith("/snapshot/")) {
    const targetDir = import_path.default.join(import_temp_dir.default, "prisma-binaries");
    await (0, import_make_dir.default)(targetDir);
    const target = import_path.default.join(targetDir, import_path.default.basename(file));
    const data = await readFile(file);
    await writeFile(target, data);
    (0, import_engine_core.plusX)(target);
    return target;
  }
  return file;
}
__name2(maybeCopyToTmp, "maybeCopyToTmp");
__name(maybeCopyToTmp, "maybeCopyToTmp");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BinaryType,
  engineEnvVarMap,
  maybeCopyToTmp,
  resolveBinary
});
