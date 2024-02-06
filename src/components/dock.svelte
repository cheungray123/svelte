<script>
    import Icon from '@iconify/svelte'
    import { activeThing, openedApps } from '../stores/settings'
    import { dockApps } from '../data/dock'
    import Dockroot from './dockroot.svelte'
    import Dockitem from './dockitem.svelte'

    const toggleActiveThing = (e) => {
        // 使用 $ 符号来直接访问 activeThing 存储的值。
        // 如果当前活跃的元素/应用已经是传入的 e，则将 activeThing 清空（即没有活跃元素）；
        // 否则，将 activeThing 设置为 e，表示 e 成为新的活跃元素/应用。
        $activeThing = $activeThing === e ? '' : e
    }
    const toggleOpenApp = (app) => {
        if ($openedApps.includes(app)) {
            $activeThing = ''
            $openedApps = $openedApps.filter((oa) => oa !== app)
        } else {
            $activeThing = app
            $openedApps = [...$openedApps, app]
        }
    }
</script>

<Dockroot>
    {#each dockApps as app}
        <Dockitem
            active={$activeThing === app.app}
            on:click={() => toggleActiveThing(app.app)}>
            <Icon
                icon={app.icon}
                class="text-[calc(var(--size)*36px)] duration-75 ease-linear fill-blue-400" />
        </Dockitem>
    {/each}
</Dockroot>
