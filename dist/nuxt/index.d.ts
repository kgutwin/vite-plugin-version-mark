import * as _nuxt_schema from '@nuxt/schema';

interface VitePluginVersionMarkInput {
    name?: string;
    version?: string;
    ifGitSHA?: boolean;
    ifShortSHA?: boolean;
    gitCommand?: string;
    ifMeta?: boolean;
    ifLog?: boolean;
    ifGlobal?: boolean;
}

declare type ModuleOptions = VitePluginVersionMarkInput;
declare const nuxtVersionMark: _nuxt_schema.NuxtModule<VitePluginVersionMarkInput>;

export { ModuleOptions, nuxtVersionMark as default };
