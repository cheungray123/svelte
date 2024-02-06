<script>
    import { activeThing } from '../store'
    import { draggable } from '@neodrag/svelte'
    import { fly } from 'svelte/transition'
    import clickOutside from '../utils/clickOutside'
    import Topbar from '../components/topbar.svelte'
</script>

<section
    use:draggable={{
        handle: '.topbar'
    }}
    transition:fly={{ y: 700, duration: 200, opacity: 1 }}
    use:clickOutside={{
        callback: () => ($activeThing = ''),
        exclude: [document.querySelector('.active')]
    }}
    class="absolute w-[48rem] h-[min(100%-4rem,620px)] left-[calc(50%-24rem)] top-[calc(50%-calc(min(100%-4rem,620px)/2))] bg-white rounded-lg shadow">
    <Topbar label="设置" />
</section>
