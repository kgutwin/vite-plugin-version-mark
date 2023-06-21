"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugins/vite.ts
var vite_exports = {};
__export(vite_exports, {
  vitePluginVersionMark: () => vitePluginVersionMark
});
module.exports = __toCommonJS(vite_exports);

// src/plugins/core/main.ts
var import_child_process = __toESM(require("child_process"), 1);
var getGitSHA = (ifShortSHA, gitCommand) => {
  const { exec } = import_child_process.default;
  let sh;
  if (gitCommand) {
    sh = gitCommand;
  } else if (ifShortSHA) {
    sh = "git rev-parse --short HEAD";
  } else {
    sh = "git rev-parse HEAD";
  }
  return new Promise((resolve, reject) => {
    exec(sh, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        const output = stdout.toString()?.replace("\n", "");
        resolve(output);
      }
    });
  });
};
var analyticOptions = async (options) => {
  const {
    name = process.env["npm_package_name"],
    version = process.env["npm_package_version"],
    ifGitSHA = false,
    ifShortSHA = true,
    gitCommand = void 0,
    ifMeta = true,
    ifLog = true,
    ifGlobal = true
  } = options;
  const printVersion = ifGitSHA ? await getGitSHA(ifShortSHA, gitCommand) : version;
  const printName = `${name?.replace(/((?!\w).)/g, "_")?.toLocaleUpperCase?.()}_VERSION`;
  const printInfo = `${printName}: ${printVersion}`;
  return {
    ifMeta,
    ifLog,
    ifGlobal,
    printVersion,
    printName,
    printInfo
  };
};

// src/plugins/vite.ts
var vitePluginVersionMark = (options = {}) => {
  return {
    name: "vite-plugin-version-mark",
    async transformIndexHtml() {
      const {
        ifMeta,
        ifLog,
        ifGlobal,
        printVersion,
        printName,
        printInfo
      } = await analyticOptions(options);
      const els = [];
      ifMeta && els.push({
        tag: "meta",
        injectTo: "head-prepend",
        attrs: {
          name: "application-name",
          content: printInfo
        }
      });
      ifLog && els.push({
        tag: "script",
        injectTo: "body",
        children: `console.log("${printInfo}")`
      });
      ifGlobal && els.push({
        tag: "script",
        injectTo: "body",
        children: `__${printName}__ = "${printVersion}"`
      });
      return els;
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  vitePluginVersionMark
});
//# sourceMappingURL=index.cjs.map