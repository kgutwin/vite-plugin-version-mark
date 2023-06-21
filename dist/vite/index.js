// src/plugins/core/main.ts
import childProcess from "child_process";
var getGitSHA = (ifShortSHA, gitCommand) => {
  const { exec } = childProcess;
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
export {
  vitePluginVersionMark
};
//# sourceMappingURL=index.js.map