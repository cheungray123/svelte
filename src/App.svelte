<script>
    import { activeThing, openedApps } from './store'
    import Bg from './apps/bg.svelte'
    import Dock from './apps/dock.svelte'
</script>

<Bg />
<Dock />
{#if $activeThing === 'Settings'}
    {#await import('./apps/settings.svelte') then { default: Settings }}
        <Settings />
    {/await}
{:else if $activeThing === 'Todo'}
    {#await import('./apps/Todo.svelte') then { default: Todo }}
        <Todo />
    {/await}
{:else if $activeThing === 'Photos'}
    {#await import('./apps/wallpaper.svelte') then { default: Wallpaper }}
        <Wallpaper />
    {/await}
{:else if $activeThing === 'Notes'}
    {#await import('./apps/Notepad.svelte') then { default: Notepad }}
        <Notepad />
    {/await}
{/if}
