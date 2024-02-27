# 点击外部动作 (clickOutside Action)

这个Svelte动作允许你监听点击事件，当点击发生在指定节点外部时执行回调函数。这对于实现如下拉菜单的关闭非常有用。

This Svelte action allows you to listen for click events that occur outside of a specified node, executing a callback function when such clicks are detected. This is particularly useful for implementing behaviors like closing a dropdown menu.

## 优化后的代码 (Optimized Code)

```javascript
export function clickOutside(node, { callback = () => {}, exclude = [] }) {
    let currentCallback = callback;
    let currentExclude = exclude;

    const handleClick = event => {
        // 确保事件目标不在当前节点内
        // Ensure the event target is not inside the current node
        const isInsideNode = node.contains(event.target);
        // 确保事件目标不在排除的元素内
        // Ensure the event target is not inside any of the excluded elements
        const isInsideExclude = currentExclude.some(el => el && el.contains(event.target));
        // 如果点击发生在节点和排除元素外部，则调用回调函数
        // If the click occurs outside the node and excluded elements, call the callback function
        if (!isInsideNode && !isInsideExclude) {
            currentCallback();
        }
    };

    // 使用捕获阶段以确保在冒泡前捕捉到事件
    // Use the capture phase to ensure the event is caught before bubbling
    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        },
        update({ callback: newCallback = currentCallback, exclude: newExclude = currentExclude }) {
            currentCallback = newCallback;
            currentExclude = newExclude;
        }
    };
}
