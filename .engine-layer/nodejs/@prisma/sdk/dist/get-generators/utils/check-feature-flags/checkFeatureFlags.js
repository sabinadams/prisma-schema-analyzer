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
  checkFeatureFlags: () => checkFeatureFlags
});
var import_forbiddenTransactionsWithProxyFlagMessage = __toModule(require("./forbiddenTransactionsWithProxyFlagMessage"));
var import_proxyFeatureFlagMissingMessage = __toModule(require("./proxyFeatureFlagMissingMessage"));
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
function checkFeatureFlags(config) {
  checkProxyFeatureFlag(config);
  checkForbiddenTransactionsWithProxyFlag(config);
}
__name(checkFeatureFlags, "checkFeatureFlags");
__name2(checkFeatureFlags, "checkFeatureFlags");
function checkProxyFeatureFlag(config) {
  if ((config.generators.some((g) => g.config.engineType === "dataproxy") || process.env.PRISMA_CLIENT_ENGINE_TYPE === "dataproxy") && !config.generators.some((g) => {
    return g.previewFeatures.some((previewFeature) => previewFeature.toLowerCase() === "dataProxy".toLowerCase());
  })) {
    throw new Error(import_proxyFeatureFlagMissingMessage.proxyFeatureFlagMissingMessage);
  }
}
__name(checkProxyFeatureFlag, "checkProxyFeatureFlag");
__name2(checkProxyFeatureFlag, "checkProxyFeatureFlag");
function checkForbiddenTransactionsWithProxyFlag(config) {
  if (config.generators.some((g) => {
    const lowerCasePreviewFeatures = g.previewFeatures.map((pf) => pf.toLowerCase());
    return ["dataProxy", "interactiveTransactions"].every((pf) => lowerCasePreviewFeatures.includes(pf.toLowerCase()));
  })) {
    throw new Error(import_forbiddenTransactionsWithProxyFlagMessage.forbiddenTransactionsWithProxyFlagMessage);
  }
}
__name(checkForbiddenTransactionsWithProxyFlag, "checkForbiddenTransactionsWithProxyFlag");
__name2(checkForbiddenTransactionsWithProxyFlag, "checkForbiddenTransactionsWithProxyFlag");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkFeatureFlags
});
