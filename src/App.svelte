<script>
    import { activeThing, openedApps } from './stores/settings'
    import Bg from './components/bg.svelte'
    import Dock from './components/dock.svelte'
    const toggleOpenApp = (app) => {
        // 使用 $openedApps 变量读取 store 的当前值
        openedApps.update(($openedApps) => {
            if ($openedApps.includes(app)) {
                // 如果应用已经打开，则关闭它
                activeThing.set('') // 设置 activeThing 为 ""
                return $openedApps.filter((oa) => oa !== app) // 返回更新后的数组，移除指定的 app
            } else {
                // 如果应用未打开，则打开它
                activeThing.set(app) // 设置 activeThing 为当前 app
                return [...$openedApps, app] // 返回更新后的数组，添加当前 app
            }
        })
    }
</script>

<Bg />
<Dock />

{#if $activeThing === 'Settings'}
    {#await import('./components/settings.svelte') then { default: Settings }}
        <Settings />
    {/await}
{/if}
