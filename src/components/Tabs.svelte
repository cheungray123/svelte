<script>
    import { createEventDispatcher } from 'svelte'
    import { crossfade, scale } from 'svelte/transition'
    const dispatch = createEventDispatcher()
    /**
     * @param {Array<number>} items
     */
    export let items = []
    export let selected = 0
    /**
     * @param {number} index
     */
    function setSelected(index) {
        selected = index
        dispatch('selectedChange', items[index])
        dispatch('selectedIndexChange', index)
    }
</script>

<div
    data-component="tabs"
    role="tablist"
    dir="ltr"
    aria-orientation="horizontal"
    data-theme={theme}
    {...$$restProps}>
    {#each items as item, i}
        {@const isActive = i === selected}
        {@const tabindex = isActive ? 0 : -1}
        {@const id = `${tabsId}-trigger-tab${i}`}
        <slot
            name="tab"
            {isActive}
            {id}
            {item}
            setSelected={() => setSelected(i)}>
            <button
                part="tab"
                type="button"
                role="tab"
                data-active={isActive ? true : null}
                aria-label="{item} Tab"
                on:click={() => setSelected(i)}
                aria-selected={isActive}
                {id}
                {tabindex}
                data-orientation="horizontal"
                bind:this={refs[i]}>
                {item.title}
                {#if isActive}
                    <div
                        part="line"
                        in:receive={{ key: 'tab-active' }}
                        out:send={{ key: 'tab-active' }} />
                {:else}
                    <div part="line" />
                {/if}
            </button>
        </slot>
    {/each}
</div>
