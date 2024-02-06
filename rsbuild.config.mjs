import { defineConfig } from '@rsbuild/core'
import { pluginSvelte } from '@rsbuild/plugin-svelte'

export default defineConfig({
    plugins: [pluginSvelte()],
    source: {
        alias: {
            '@': './src'
        }
    }
})
