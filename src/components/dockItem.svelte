<script>
    export let active = false
</script>

<button
    type="button"
    class=" mx-4 my-2.5 aspect-square w-[calc(var(--size)*42px)] overflow-hidden rounded-[calc(var(--size)*8px)] duration-75 ease-linear [--size:1] flex items-center justify-center"
    class:active
    on:click
    {...$$props}>
    <slot />
</button>
