var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// server.js
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// server.js
var import_vercel = require("@remix-run/vercel");

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/sabinadams/Documents/projects/prisma-schema-analyzer-remix/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/styles/app.css
var app_default = "/_static/build/_assets/app-NDKEGEP3.css";

// route:/Users/sabinadams/Documents/projects/prisma-schema-analyzer-remix/app/root.tsx
function links() {
  return [
    { rel: "stylesheet", href: app_default },
    { rel: "stylesheet", href: "/prism-duotone-sea.css" }
  ];
}
var meta = () => ({
  charset: "utf-8",
  title: "Prisma Schema Analyzer",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}

// route:/Users/sabinadams/Documents/projects/prisma-schema-analyzer-remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});

// app/components/schema-form.tsx
var import_react3 = __toESM(require("react"));
var import_prismjs = __toESM(require("prismjs"));
require("prismjs/components/prism-graphql");
var SchemaForm = ({ fetcher }) => {
  const textarea = (0, import_react3.useRef)(null);
  const pre = (0, import_react3.useRef)(null);
  const [unformatted, setUnformatted] = (0, import_react3.useState)(``);
  const handleKeyDown = (evt) => {
    let value = unformatted, selStartPos = evt.currentTarget.selectionStart;
    if (evt.key === "Tab") {
      value = value.substring(0, selStartPos) + "    " + value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();
      setUnformatted(value);
    }
  };
  const handleScroll = (e, ref) => {
    if (ref && ref.current) {
      ref.current.scrollTop = e.currentTarget.scrollTop;
      ref.current.scrollLeft = e.currentTarget.scrollLeft;
      if (!(Number(ref.current.clientHeight) > Number(e.currentTarget.clientHeight))) {
        ref.current.style.width = `${Number(e.currentTarget.clientHeight)}px`;
      }
      if (!(Number(ref.current.style.height.replace("px", "")) > Number(e.currentTarget.style.height.replace("px", "")))) {
        ref.current.style.height = `${e.currentTarget.style.height}px`;
      }
    }
  };
  (0, import_react3.useEffect)(() => {
    import_prismjs.default.highlightAll();
  }, [unformatted]);
  return /* @__PURE__ */ import_react3.default.createElement(fetcher.Form, {
    id: "schema-form",
    method: "post",
    action: "/dmmf",
    className: "h-full overflow-scroll code-edit-container"
  }, /* @__PURE__ */ import_react3.default.createElement("input", {
    type: "hidden",
    name: "schema",
    defaultValue: unformatted
  }), /* @__PURE__ */ import_react3.default.createElement("textarea", {
    ref: textarea,
    name: "schema-display",
    className: "code-input overflow-scroll p-2 focus:outline-none whitespace-nowrap placeholder-teal-300 caret-teal-300",
    placeholder: "Paste your schema here...",
    onChange: (evt) => setUnformatted(evt.target.value),
    onKeyDown: handleKeyDown,
    value: unformatted,
    onScroll: (e) => handleScroll(e, pre)
  }), /* @__PURE__ */ import_react3.default.createElement("pre", {
    ref: pre,
    className: "code-output whitespace-nowrap overflow-scroll",
    onScroll: (e) => handleScroll(e, textarea)
  }, /* @__PURE__ */ import_react3.default.createElement("code", {
    className: `language-graphql whitespace-nowrap overflow-scroll`
  }, unformatted + "\n")));
};

// route:/Users/sabinadams/Documents/projects/prisma-schema-analyzer-remix/app/routes/index.tsx
var import_react4 = require("@remix-run/react");

// app/components/schema-output.tsx
var import_react_inspector = require("react-inspector");
var SchemaOutput = ({ dmmf }) => {
  return /* @__PURE__ */ React.createElement(import_react_inspector.ObjectInspector, {
    data: dmmf,
    theme: __spreadProps(__spreadValues({}, import_react_inspector.chromeDark), {
      BASE_BACKGROUND_COLOR: "#1E293B",
      BASE_FONT_SIZE: "24px",
      TREENODE_FONT_SIZE: "1rem"
    })
  });
};

// route:/Users/sabinadams/Documents/projects/prisma-schema-analyzer-remix/app/routes/index.tsx
function Index() {
  var _a, _b, _c;
  const fetcher = (0, import_react4.useFetcher)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-screen w-full bg-gray-900 font-mono flex flex-col pt-8"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-900 p-2 relative font-extrabold text-4xl text-center bg-gradient-to-r from-green-400 to-blue-500 "
  }, "Prisma Schema Analyzer", /* @__PURE__ */ React.createElement("span", {
    className: "absolute right-4 text-sm top-5"
  }, "Made with \u2764\uFE0F by\xA0", /* @__PURE__ */ React.createElement("a", {
    className: "text-teal-300 animate-pulse",
    href: "https://www.twitter.com/sabinthedev",
    target: "_blank"
  }, "@sabinthedev"))), /* @__PURE__ */ React.createElement("div", {
    className: "flex gap-x-10 h-full w-full p-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "h-full flex-1 rounded-xl overflow-scroll"
  }, /* @__PURE__ */ React.createElement(SchemaForm, {
    fetcher
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    form: "schema-form",
    className: "bg-teal-400 transition duration-700 ease-in-out hover:-translate-y-2 bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-75 hover:drop-shadow-xl rounded-full w-24 h-24 flex justify-center items-center relative font-bold text-slate-800"
  }, "Process")), /* @__PURE__ */ React.createElement("div", {
    className: `
        ${((_a = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a.error) && "flex justify-center items-center animate-pulse text-center drop-shadow-[0_0_15px_rgb(251,113,133)]"}
        ${(fetcher == null ? void 0 : fetcher.data) && !((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error) && `drop-shadow-[0_0_15px_#5eead4]`}
        h-full flex-1  rounded-xl overflow-scroll p-4 bg-slate-800 px-8
      `
  }, ((_c = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _c.error) ? /* @__PURE__ */ React.createElement("p", {
    className: "font-extrabold text-2xl m-0 p-0 text-rose-400"
  }, fetcher.data.error) : (fetcher == null ? void 0 : fetcher.data) && /* @__PURE__ */ React.createElement(SchemaOutput, {
    dmmf: fetcher == null ? void 0 : fetcher.data
  }))));
}

// route:/Users/sabinadams/Documents/projects/prisma-schema-analyzer-remix/app/routes/dmmf.ts
var dmmf_exports = {};
__export(dmmf_exports, {
  action: () => action
});
var import_node = require("@remix-run/node");
var import_sdk = require("@prisma/sdk");
var action = async ({ request }) => {
  var _a;
  const formData = await request.formData();
  const schema = ((_a = formData.get("schema")) == null ? void 0 : _a.toString()) || "";
  try {
    await (0, import_sdk.formatSchema)({ schema });
  } catch (e) {
    return (0, import_node.json)({ error: "Invalid schema.", details: e.message }, { status: 400 });
  }
  let dmmf = {};
  try {
    dmmf = await (0, import_sdk.getDMMF)({ datamodel: schema });
  } catch (e) {
    return (0, import_node.json)({
      error: "There was a problem parsing the DMMF object. Please check your schema.",
      details: e.message
    }, { status: 400 });
  }
  return (0, import_node.json)(dmmf);
};

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "143ae428", "entry": { "module": "/_static/build/entry.client-H53WBLVW.js", "imports": ["/_static/build/_shared/chunk-3PVTTNKM.js", "/_static/build/_shared/chunk-OGYP3M3B.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/_static/build/root-MYQB6BX3.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/dmmf": { "id": "routes/dmmf", "parentId": "root", "path": "dmmf", "index": void 0, "caseSensitive": void 0, "module": "/_static/build/routes/dmmf-JSF4JNDP.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/_static/build/routes/index-POSUIRL3.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/_static/build/manifest-143AE428.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/dmmf": {
    id: "routes/dmmf",
    parentId: "root",
    path: "dmmf",
    index: void 0,
    caseSensitive: void 0,
    module: dmmf_exports
  }
};

// server.js
var server_default = (0, import_vercel.createRequestHandler)({ build: server_build_exports, mode: "production" });
module.exports = __toCommonJS(server_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
