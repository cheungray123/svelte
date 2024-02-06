<script>
    import { activeThing, openedApps } from '../store'
    import Icon from '@iconify/svelte'
    let onClickClose = () => {
        $activeThing = ''
    }
    export let label = ''
</script>

<div
    class="h-9 w-full flex px-4 items-center justify-between topbar hover:cursor-move bg-gray-100">
    <span class="text-base font-bold">{label}</span>
    <button
        type="button"
        on:click={onClickClose}>
        <Icon
            icon="material-symbols:close-small-outline-rounded"
            width="24"
            height="24" />
    </button>
</div>
