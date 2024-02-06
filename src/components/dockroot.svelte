<script>
    import { onMount } from 'svelte'

    let buttonRef // 确保这个变量在使用前已经被正确初始化

    const curve = (x, multiple = 1) =>
        multiple * Math.exp((-x * x) / 200 / 200) + 1

    let buttons // 提前声明按钮列表变量

    function handleMouseMove(e) {
        requestAnimationFrame(() => {
            // 使用requestAnimationFrame优化性能
            buttons.forEach((li) => {
                const centroid = li.offsetLeft + li.offsetWidth / 2
                const sizeValue = curve(e.clientX - centroid)
                li.style.setProperty('--size', sizeValue)
            })
        })
    }

    function handleMouseLeave() {
        buttons.forEach((li) => {
            li.style.setProperty('--size', 1)
        })
    }

    onMount(() => {
        buttons = buttonRef.querySelectorAll('button') // 在组件挂载时获取按钮列表

        buttonRef.addEventListener('mousemove', handleMouseMove)
        buttonRef.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            buttonRef.removeEventListener('mousemove', handleMouseMove)
            buttonRef.removeEventListener('mouseleave', handleMouseLeave)
        }
    })
</script>

<section class="absolute bottom-4 w-full">
    <div
        class="flex w-fit m-auto bg-white/50 rounded-lg h-16 items-end justify-center"
        role="listbox"
        tabindex="0"
        bind:this={buttonRef}>
        <slot />
    </div>
</section>
