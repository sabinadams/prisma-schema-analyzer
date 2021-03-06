var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
  BinaryType: () => import_resolveBinary.BinaryType,
  ClientEngineType: () => import_getClientEngineType.ClientEngineType,
  DEFAULT_CLIENT_ENGINE_TYPE: () => import_getClientEngineType.DEFAULT_CLIENT_ENGINE_TYPE,
  ErrorArea: () => import_panic.ErrorArea,
  Generator: () => import_Generator.Generator,
  HelpError: () => import_Help2.HelpError,
  IntrospectionEngine: () => import_IntrospectionEngine.IntrospectionEngine,
  MigrateEngineExitCode: () => import_migrateEngineCommands2.MigrateEngineExitCode,
  RustPanic: () => import_panic.RustPanic,
  arg: () => import_utils.arg,
  canConnectToDatabase: () => import_migrateEngineCommands.canConnectToDatabase,
  createDatabase: () => import_migrateEngineCommands.createDatabase,
  createSpinner: () => import_spinner.createSpinner,
  credentialsToUri: () => import_convertCredentials.credentialsToUri,
  drawBox: () => import_drawBox.drawBox,
  dropDatabase: () => import_migrateEngineCommands.dropDatabase,
  engineEnvVarMap: () => import_resolveBinary2.engineEnvVarMap,
  extractPreviewFeatures: () => import_extractPreviewFeatures.extractPreviewFeatures,
  format: () => import_utils.format,
  formatms: () => import_formatms.formatms,
  getCLIPathHash: () => import_hashes.getCLIPathHash,
  getClientEngineType: () => import_getClientEngineType.getClientEngineType,
  getCommandWithExecutor: () => import_getCommandWithExecutor.getCommandWithExecutor,
  getEnvPaths: () => import_getEnvPaths.getEnvPaths,
  getGenerator: () => import_getGenerators.getGenerator,
  getGeneratorSuccessMessage: () => import_getGeneratorSuccessMessage.getGeneratorSuccessMessage,
  getGenerators: () => import_getGenerators.getGenerators,
  getNodeAPIName: () => import_get_platform.getNodeAPIName,
  getPackedPackage: () => import_getPackedPackage.getPackedPackage,
  getPlatform: () => import_get_platform.getPlatform,
  getPrismaConfigFromPackageJson: () => import_getSchema.getPrismaConfigFromPackageJson,
  getProjectHash: () => import_hashes.getProjectHash,
  getRelativeSchemaPath: () => import_getSchema.getRelativeSchemaPath,
  getSchema: () => import_getSchema.getSchema,
  getSchemaDir: () => import_getSchema.getSchemaDir,
  getSchemaDirSync: () => import_getSchema.getSchemaDirSync,
  getSchemaPath: () => import_getSchema.getSchemaPath,
  getSchemaPathFromPackageJson: () => import_getSchema.getSchemaPathFromPackageJson,
  getSchemaPathFromPackageJsonSync: () => import_getSchema.getSchemaPathFromPackageJsonSync,
  getSchemaPathSync: () => import_getSchema.getSchemaPathSync,
  getSchemaSync: () => import_getSchema.getSchemaSync,
  handlePanic: () => import_handlePanic.handlePanic,
  highlightDatamodel: () => import_highlight.highlightDatamodel,
  highlightSql: () => import_highlight.highlightSql,
  highlightTS: () => import_highlight.highlightTS,
  isCi: () => import_isCi.isCi,
  isCurrentBinInstalledGlobally: () => import_isCurrentBinInstalledGlobally.isCurrentBinInstalledGlobally,
  isError: () => import_utils.isError,
  jestConsoleContext: () => import_jestContext.jestConsoleContext,
  jestContext: () => import_jestContext.jestContext,
  jestProcessContext: () => import_jestContext.jestProcessContext,
  keyBy: () => import_keyBy.keyBy,
  link: () => import_link.link,
  load: () => import_load.load,
  loadEnvFile: () => import_loadEnvFile.loadEnvFile,
  logger: () => logger,
  mapPreviewFeatures: () => import_mapPreviewFeatures.mapPreviewFeatures,
  maskSchema: () => import_maskSchema.maskSchema,
  missingGeneratorMessage: () => import_missingGeneratorMessage.missingGeneratorMessage,
  parseBinaryTargetsEnvValue: () => import_parseEnvValue.parseBinaryTargetsEnvValue,
  parseEnvValue: () => import_parseEnvValue.parseEnvValue,
  pick: () => import_pick.pick,
  platformRegex: () => import_platformRegex.platformRegex,
  printConfigWarnings: () => import_printConfigWarnings.printConfigWarnings,
  protocolToConnectorType: () => import_convertCredentials.protocolToConnectorType,
  resolveBinary: () => import_resolveBinary2.resolveBinary,
  sendPanic: () => import_sendPanic.sendPanic,
  trimBlocksFromSchema: () => import_trimBlocksFromSchema.trimBlocksFromSchema,
  trimNewLine: () => import_trimBlocksFromSchema.trimNewLine,
  tryLoadEnvs: () => import_tryLoadEnvs.tryLoadEnvs,
  unknownCommand: () => import_Help.unknownCommand,
  uriToCredentials: () => import_convertCredentials.uriToCredentials
});
var import_getGeneratorSuccessMessage = __toModule(require("./cli/getGeneratorSuccessMessage"));
var import_getSchema = __toModule(require("./cli/getSchema"));
var import_hashes = __toModule(require("./cli/hashes"));
var import_Help = __toModule(require("./cli/Help"));
var import_Help2 = __toModule(require("./cli/Help"));
var import_utils = __toModule(require("./cli/utils"));
var import_getClientEngineType = __toModule(require("./client/getClientEngineType"));
var import_convertCredentials = __toModule(require("./convertCredentials"));
__reExport(exports, __toModule(require("./engine-commands")));
var import_Generator = __toModule(require("./Generator"));
var import_getGenerators = __toModule(require("./get-generators/getGenerators"));
var import_getPackedPackage = __toModule(require("./getPackedPackage"));
var import_highlight = __toModule(require("./highlight/highlight"));
var import_IntrospectionEngine = __toModule(require("./IntrospectionEngine"));
var logger = __toModule(require("./logger"));
var import_migrateEngineCommands = __toModule(require("./migrateEngineCommands"));
var import_migrateEngineCommands2 = __toModule(require("./migrateEngineCommands"));
var import_panic = __toModule(require("./panic"));
var import_resolveBinary = __toModule(require("./resolveBinary"));
var import_resolveBinary2 = __toModule(require("./resolveBinary"));
var import_sendPanic = __toModule(require("./sendPanic"));
var import_drawBox = __toModule(require("./utils/drawBox"));
var import_extractPreviewFeatures = __toModule(require("./utils/extractPreviewFeatures"));
var import_formatms = __toModule(require("./utils/formatms"));
var import_getCommandWithExecutor = __toModule(require("./utils/getCommandWithExecutor"));
var import_getEnvPaths = __toModule(require("./utils/getEnvPaths"));
var import_handlePanic = __toModule(require("./utils/handlePanic"));
var import_isCi = __toModule(require("./utils/isCi"));
var import_isCurrentBinInstalledGlobally = __toModule(require("./utils/isCurrentBinInstalledGlobally"));
var import_jestContext = __toModule(require("./utils/jestContext"));
var import_keyBy = __toModule(require("./utils/keyBy"));
var import_link = __toModule(require("./utils/link"));
var import_load = __toModule(require("./utils/load"));
var import_loadEnvFile = __toModule(require("./utils/loadEnvFile"));
var import_mapPreviewFeatures = __toModule(require("./utils/mapPreviewFeatures"));
var import_maskSchema = __toModule(require("./utils/maskSchema"));
var import_missingGeneratorMessage = __toModule(require("./utils/missingGeneratorMessage"));
var import_parseEnvValue = __toModule(require("./utils/parseEnvValue"));
var import_pick = __toModule(require("./utils/pick"));
var import_platformRegex = __toModule(require("./utils/platformRegex"));
var import_printConfigWarnings = __toModule(require("./utils/printConfigWarnings"));
var import_spinner = __toModule(require("./utils/spinner"));
var import_trimBlocksFromSchema = __toModule(require("./utils/trimBlocksFromSchema"));
var import_tryLoadEnvs = __toModule(require("./utils/tryLoadEnvs"));
var import_get_platform = __toModule(require("@prisma/get-platform"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BinaryType,
  ClientEngineType,
  DEFAULT_CLIENT_ENGINE_TYPE,
  ErrorArea,
  Generator,
  HelpError,
  IntrospectionEngine,
  MigrateEngineExitCode,
  RustPanic,
  arg,
  canConnectToDatabase,
  createDatabase,
  createSpinner,
  credentialsToUri,
  drawBox,
  dropDatabase,
  engineEnvVarMap,
  extractPreviewFeatures,
  format,
  formatms,
  getCLIPathHash,
  getClientEngineType,
  getCommandWithExecutor,
  getEnvPaths,
  getGenerator,
  getGeneratorSuccessMessage,
  getGenerators,
  getNodeAPIName,
  getPackedPackage,
  getPlatform,
  getPrismaConfigFromPackageJson,
  getProjectHash,
  getRelativeSchemaPath,
  getSchema,
  getSchemaDir,
  getSchemaDirSync,
  getSchemaPath,
  getSchemaPathFromPackageJson,
  getSchemaPathFromPackageJsonSync,
  getSchemaPathSync,
  getSchemaSync,
  handlePanic,
  highlightDatamodel,
  highlightSql,
  highlightTS,
  isCi,
  isCurrentBinInstalledGlobally,
  isError,
  jestConsoleContext,
  jestContext,
  jestProcessContext,
  keyBy,
  link,
  load,
  loadEnvFile,
  logger,
  mapPreviewFeatures,
  maskSchema,
  missingGeneratorMessage,
  parseBinaryTargetsEnvValue,
  parseEnvValue,
  pick,
  platformRegex,
  printConfigWarnings,
  protocolToConnectorType,
  resolveBinary,
  sendPanic,
  trimBlocksFromSchema,
  trimNewLine,
  tryLoadEnvs,
  unknownCommand,
  uriToCredentials
});
