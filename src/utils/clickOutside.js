/**
 * 创建一个点击元素外部时触发的事件监听器。
 *
 * @param {Element} element - 需要检测点击外部的 DOM 元素。
 * @param {Object} [options={ callback: () => {}, exclude: [] }] - 配置选项。
 * @param {Function} [options.callback=() => {}] - 当点击事件发生在元素外部时调用的回调函数。
 * @param {Array<Element>} [options.exclude=[]] - 点击这些元素时不会触发回调函数的元素数组。
 * @returns {Object} 包含 `update` 和 `destroy` 方法的对象，用于更新监听器选项或移除监听器。
 */
export default function clickOutside(
    element,
    options = { callback: () => {}, exclude: [] }
) {
    function onClick(event) {
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
        /**
         * 更新事件监听器的配置选项。
         *
         * @param {Object} newOptions - 新的配置选项。
         * @param {Function} [newOptions.callback] - 新的回调函数。
         * @param {Array<Element>} [newOptions.exclude] - 新的排除元素数组。
         */
        update(newOptions) {
            if (typeof newOptions.callback === 'function') {
                options.callback = newOptions.callback
            }
            if (Array.isArray(newOptions.exclude)) {
                options.exclude = newOptions.exclude
            }
        },
        /**
         * 移除事件监听器。
         */
        destroy() {
            document.body.removeEventListener('click', onClick)
        }
    }
}
