import { defineConfig } from '@rsbuild/core'
import { pluginSvelte } from '@rsbuild/plugin-svelte'

export default defineConfig({
    plugins: [pluginSvelte()],
    html: {
        title: 'My Svelte App',
        favicon: './public/64.png'
    }
})
