<script>
    import { activeThing, openedApps } from '../stores/settings'
    import { createEventDispatcher } from 'svelte'
    import Icon from '@iconify/svelte'
    const dispatch = createEventDispatcher()
    let onClickClose = () => {
        $activeThing = ''
        $openedApps = $openedApps.filter((oa) => oa !== appName)
    }
    export let label = ''
</script>

<div
    class="h-9 w-full flex px-4 items-center justify-between topbar hover:cursor-move">
    <span class="text-sm font-medium">{label}</span>
    <button
        type="button"
        on:click={onClickClose}>
        <Icon
            icon="material-symbols:close-small-outline-rounded"
            width="24"
            height="24" />
    </button>
</div>
