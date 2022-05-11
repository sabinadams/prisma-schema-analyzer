import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "/_static/build/_shared/chunk-DCY7QVKG.js";
import {
  React,
  init_react
} from "/_static/build/_shared/chunk-EFCEJN5Z.js";

// browser-route-module:/Users/sabinadams/Documents/projects/prisma-schema-analyzer-remix/app/root.tsx?browser
init_react();

// app/root.tsx
init_react();

// app/styles/app.css
var app_default = "/_static/build/_assets/app-UPO2VPVB.css";

// app/root.tsx
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
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(Meta, null), /* @__PURE__ */ React.createElement(Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(Outlet, null), /* @__PURE__ */ React.createElement(ScrollRestoration, null), /* @__PURE__ */ React.createElement(Scripts, null), /* @__PURE__ */ React.createElement(LiveReload, null)));
}
export {
  App as default,
  links,
  meta
};
//# sourceMappingURL=/_static/build/root-P4ZPXTBA.js.map
