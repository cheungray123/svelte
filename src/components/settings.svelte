<script>
    import { activeThing } from '../stores/settings'
    import { draggable } from '@neodrag/svelte'
    import { fly } from 'svelte/transition'
    import clickOutside from '../utils/clickOutside'
    import Topbar from './topbar.svelte'
</script>

<section
    use:draggable={{
        handle: '.topbar'
    }}
    in:fly={{ y: 700, duration: 200, opacity: 1 }}
    out:fly={{ y: 700, duration: 200, opacity: 1 }}
    use:clickOutside={{
        callback: () => ($activeThing = ''),
        exclude: [document.querySelector('.active')]
    }}
    class="absolute w-[48rem] h-[min(100%-4rem,620px)] left-[calc(50%-24rem)] top-8 bg-white rounded-lg shadow">
    <Topbar label="设置" />
</section>
