# Svelte Draggable Action

This document provides an implementation of a draggable action for Svelte components, allowing elements to be moved around the screen with the mouse.

## Usage

1. Save the following code as `draggable.js`:

    ```javascript
    // draggable.js
    export function draggable(node, handleSelector = null) {
        let startX, startY, initialX = 0, initialY = 0;
        let frame = null;

        function handleMousedown(event) {
            if (handleSelector && !event.target.matches(handleSelector)) {
                return;
            }

            event.preventDefault();
            startX = event.clientX;
            startY = event.clientY;

            const transform = getComputedStyle(node).transform;
            if (transform && transform !== 'none') {
                const matrix = transform.match(/^matrix\((.+)\)$/)[1].split(', ').map(Number);
                initialX = matrix[4];
                initialY = matrix[5];
            }

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }

        function onMouseMove(event) {
            if (frame === null) {
                frame = requestAnimationFrame(() => {
                    const dx = event.clientX - startX + initialX;
                    const dy = event.clientY - startY + initialY;
                    node.style.transform = `translate(${dx}px, ${dy}px)`;
                    frame = null;
                });
            }
        }

        function onMouseUp() {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            cancelAnimationFrame(frame);
            frame = null;
        }

        node.addEventListener('mousedown', handleMousedown);

        return {
            destroy() {
                node.removeEventListener('mousedown', handleMousedown);
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                if (frame !== null) {
                    cancelAnimationFrame(frame);
                }
            },
            update(newHandleSelector) {
                handleSelector = newHandleSelector;
            }
        };
    }
    ```

2. In your Svelte component, use the `draggable` action:

    ```svelte
    <script>
        import { draggable } from './draggable.js';
    </script>

    <div use:draggable="{{ handle: '.handle' }}" class="draggable">
        <div class="handle">Drag me</div>
    </div>

    <style>
        .draggable {
            width: 100px;
            height: 100px;
            background-color: skyblue;
            cursor: move;
        }
        .handle {
            width: 100%;
            height: 20px;
            background-color: darkblue;
            cursor: pointer;
        }
    </style>
    ```

    In this example, the element with the class `.handle` is specified as the drag handle. Only when the user drags this handle will the `.draggable` element move.

## Parameters

- `handleSelector` (optional): A CSS selector string that specifies the drag handle. If not provided, the entire element will act as the drag handle.

## Methods

- `destroy()`: Cleans up event listeners and cancels animation frames. This is usually called automatically when the component is destroyed.
- `update(newHandleSelector)`: Updates the selector for the drag handle.
