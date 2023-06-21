// src/plugins/nuxt3.ts
import { defineNuxtModule } from "@nuxt/kit";

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
    gitCommand = "git rev-parse --short HEAD",
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

// src/plugins/nuxt3.ts
var nuxtVersionMark = defineNuxtModule({
  meta: {
    name: "nuxt-version-mark"
  },
  async setup(options, nuxt) {
    const {
      ifMeta,
      ifLog,
      ifGlobal,
      printVersion,
      printName,
      printInfo
    } = await analyticOptions(options);
    nuxt.options.app.head.meta = nuxt.options.app.head.meta || [];
    nuxt.options.app.head.script = nuxt.options.app.head.script || [];
    ifMeta && nuxt.options.app.head.meta.push({
      name: "application-name",
      content: printInfo
    });
    ifLog && nuxt.options.app.head.script.push({
      children: `console.log("${printInfo}")`
    });
    ifGlobal && nuxt.options.app.head.script.push({
      children: `__${printName}__ = "${printVersion}"`
    });
  }
});
var nuxt3_default = nuxtVersionMark;
export {
  nuxt3_default as default
};
//# sourceMappingURL=index.js.map