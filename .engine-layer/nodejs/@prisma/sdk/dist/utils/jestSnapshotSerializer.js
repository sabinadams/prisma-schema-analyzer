var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => jestSnapshotSerializer_default
});
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __commonJS = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function require2() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, "require"), "__commonJS");
var require_jestSnapshotSerializer = __commonJS({
  "src/utils/jestSnapshotSerializer.js"(exports, module2) {
    const path = require("path");
    const replaceAll = require("replace-string");
    const stripAnsi = require("strip-ansi");
    const { platformRegex } = require("./platformRegex");
    const pipe = /* @__PURE__ */ __name2((...fns) => (x) => fns.reduce((v, f) => f(v), x), "pipe");
    function normalizePrismaPaths(str) {
      return str.replace(/prisma\\([\w-]+)\.prisma/g, "prisma/$1.prisma").replace(/prisma\\seed\.ts/g, "prisma/seed.ts").replace(/custom-folder\\seed\.js/g, "custom-folder/seed.js");
    }
    __name(normalizePrismaPaths, "normalizePrismaPaths");
    __name2(normalizePrismaPaths, "normalizePrismaPaths");
    function normalizeLogs(str) {
      return str.replace(/Started query engine http server on http:\/\/127\.0\.0\.1:\d{1,5}/g, "Started query engine http server on http://127.0.0.1:00000").replace(/Starting a postgresql pool with \d+ connections./g, "Starting a postgresql pool with XX connections.");
    }
    __name(normalizeLogs, "normalizeLogs");
    __name2(normalizeLogs, "normalizeLogs");
    function normalizeTmpDir(str) {
      return str.replace(/\/tmp\/([a-z0-9]+)\//g, "/tmp/dir/");
    }
    __name(normalizeTmpDir, "normalizeTmpDir");
    __name2(normalizeTmpDir, "normalizeTmpDir");
    function trimErrorPaths(str) {
      const parentDir = path.dirname(path.dirname(path.dirname(__dirname)));
      return replaceAll(str, parentDir, "");
    }
    __name(trimErrorPaths, "trimErrorPaths");
    __name2(trimErrorPaths, "trimErrorPaths");
    function normalizeToUnixPaths(str) {
      return replaceAll(str, path.sep, "/");
    }
    __name(normalizeToUnixPaths, "normalizeToUnixPaths");
    __name2(normalizeToUnixPaths, "normalizeToUnixPaths");
    function normalizeGithubLinks(str) {
      return str.replace(/https:\/\/github.com\/prisma\/prisma(-client-js)?\/issues\/new\S+/, "TEST_GITHUB_LINK");
    }
    __name(normalizeGithubLinks, "normalizeGithubLinks");
    __name2(normalizeGithubLinks, "normalizeGithubLinks");
    function normalizeTsClientStackTrace(str) {
      return str.replace(/([/\\]client[/\\]src[/\\]__tests__[/\\].*test.ts)(:\d*:\d*)/, "$1:0:0");
    }
    __name(normalizeTsClientStackTrace, "normalizeTsClientStackTrace");
    __name2(normalizeTsClientStackTrace, "normalizeTsClientStackTrace");
    function removePlatforms(str) {
      return str.replace(platformRegex, "TEST_PLATFORM");
    }
    __name(removePlatforms, "removePlatforms");
    __name2(removePlatforms, "removePlatforms");
    function normalizeNodeApiLibFilePath(str) {
      return str.replace(/((lib)?query_engine-TEST_PLATFORM.)(.*)(.node)/, "libquery_engine-TEST_PLATFORM.LIBRARY_TYPE.node");
    }
    __name(normalizeNodeApiLibFilePath, "normalizeNodeApiLibFilePath");
    __name2(normalizeNodeApiLibFilePath, "normalizeNodeApiLibFilePath");
    function normalizeBinaryFilePath(str) {
      return str.replace(/query-engine-TEST_PLATFORM\.exe/, "query-engine-TEST_PLATFORM");
    }
    __name(normalizeBinaryFilePath, "normalizeBinaryFilePath");
    __name2(normalizeBinaryFilePath, "normalizeBinaryFilePath");
    function normalizeMigrateTimestamps(str) {
      return str.replace(/\d{14}/g, "20201231000000");
    }
    __name(normalizeMigrateTimestamps, "normalizeMigrateTimestamps");
    __name2(normalizeMigrateTimestamps, "normalizeMigrateTimestamps");
    function normalizeDbUrl(str) {
      return str.replace(/(localhost|postgres|mysql|mssql|mongodb_migrate):(\d+)/g, "localhost:$2");
    }
    __name(normalizeDbUrl, "normalizeDbUrl");
    __name2(normalizeDbUrl, "normalizeDbUrl");
    function normalizeRustError(str) {
      return str.replace(/\/rustc\/(.+)\//g, "/rustc/hash/").replace(/(\[.*)(:\d*:\d*)(\])/g, "[/some/rust/path:0:0$3");
    }
    __name(normalizeRustError, "normalizeRustError");
    __name2(normalizeRustError, "normalizeRustError");
    function normalizeTime(str) {
      return str.replace(/ \d+ms/g, " XXXms").replace(/ \d+(\.\d+)?s/g, " XXXms");
    }
    __name(normalizeTime, "normalizeTime");
    __name2(normalizeTime, "normalizeTime");
    function prepareSchemaForSnapshot(str) {
      if (!str.includes("tmp/prisma-tests/integration-test"))
        return str;
      const urlRegex = /url\s*=\s*.+/;
      const outputRegex = /output\s*=\s*.+/;
      return str.split("\n").map((line) => {
        const urlMatch = urlRegex.exec(line);
        if (urlMatch) {
          return `${line.slice(0, urlMatch.index)}url = "***"`;
        }
        const outputMatch = outputRegex.exec(line);
        if (outputMatch) {
          return `${line.slice(0, outputMatch.index)}output = "***"`;
        }
        return line;
      }).join("\n");
    }
    __name(prepareSchemaForSnapshot, "prepareSchemaForSnapshot");
    __name2(prepareSchemaForSnapshot, "prepareSchemaForSnapshot");
    module2.exports = {
      test(value) {
        return typeof value === "string" || value instanceof Error;
      },
      serialize(value) {
        const message = typeof value === "string" ? value : value instanceof Error ? value.message : "";
        return pipe(stripAnsi, prepareSchemaForSnapshot, normalizeTmpDir, normalizeTime, normalizeGithubLinks, removePlatforms, normalizeNodeApiLibFilePath, normalizeBinaryFilePath, normalizeTsClientStackTrace, trimErrorPaths, normalizePrismaPaths, normalizeLogs, normalizeToUnixPaths, normalizeDbUrl, normalizeRustError, normalizeMigrateTimestamps)(message);
      }
    };
  }
});
var jestSnapshotSerializer_default = require_jestSnapshotSerializer();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
