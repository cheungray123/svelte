export default function clickOutside(
    element,
    options = { callback: () => {}, exclude: [] } // 默认值确保了exclude是一个空数组
) {
    function onClick(event) {
        // 确保exclude总是一个数组
        const excludeElements = Array.isArray(options.exclude)
            ? options.exclude
            : []
        if (
            !element.contains(event.target) &&
            !excludeElements.some((e) => e.contains(event.target)) &&
            typeof options.callback === 'function'
        ) {
            options.callback()
        }
    }

    document.body.addEventListener('click', onClick)

    return {
        update(newOptions) {
            if (typeof newOptions.callback === 'function') {
                options.callback = newOptions.callback
            }
            if (Array.isArray(newOptions.exclude)) {
                options.exclude = newOptions.exclude
            }
        },
        destroy() {
            document.body.removeEventListener('click', onClick)
        }
    }
}
