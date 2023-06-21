import { Plugin } from 'vite';

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

declare const vitePluginVersionMark: (options?: VitePluginVersionMarkInput) => Plugin;

export { vitePluginVersionMark };
