<script>
    import { draggable } from '@neodrag/svelte'
    import { fly } from 'svelte/transition'
    import Topbar from '../components/topbar.svelte'
    import wallpaper from '../data/wallpaper.json'
    import { settings, activeThing } from '../store'
    import clickOutside from '../utils/clickOutside'
    $: defaultBackgroundImage = $settings.defaultBackgroundImage
    function handleImageClick(imagePath) {
        settings.handleChange('defaultBackgroundImage', imagePath) // 更新store中的defaultBackgroundImage
    }
</script>

<section
    transition:fly={{ y: 700, duration: 200, opacity: 1 }}
    use:draggable={{
        handle: '.topbar'
    }}
    use:clickOutside={{
        callback: () => ($activeThing = ''),
        exclude: [document.querySelector('.active')]
    }}
    class="absolute w-[48rem] h-[min(100%-4rem,620px)] left-[calc(50%-24rem)] top-[calc(50%-calc(min(100%-4rem,620px)/2))] bg-white rounded-lg shadow overflow-hidden">
    <Topbar label="背景设置" />
    <div
        class="w-fit h-[calc(100%-36px)] grid grid-cols-3 gap-4 max-h-full overflow-y-auto">
        {#each wallpaper as img}
            <!-- svelte-ignore missing-declaration -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

            <img
                src={img.path}
                alt={img.name}
                class:opacity-60={defaultBackgroundImage === img.path}
                on:click={() => handleImageClick(img.path)} />
        {/each}
    </div>
</section>
