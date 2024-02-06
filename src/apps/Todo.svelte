<script>
    import { draggable } from '@neodrag/svelte'
    import { fade, fly } from 'svelte/transition'
    import Topbar from '../components/topbar.svelte'
    import Icon from '@iconify/svelte'
    import { getStorage, setStorage } from '../utils/storage'
    import { onMount } from 'svelte'
    let todoList = []
    let newTodo = ''
    let filter = 'all'
    onMount(() => {
        const storedTodos = getStorage('todos')
        if (storedTodos) {
            todoList = storedTodos
        }
    })

    function addTodo(event) {
        event.preventDefault()
        if (newTodo.trim() !== '') {
            todoList = [...todoList, { text: newTodo, completed: false }]
            updateLocalStorage()
            newTodo = ''
        }
    }

    function toggleCompletion(index) {
        todoList = todoList.map((todo, i) => {
            if (i === index) {
                return { ...todo, completed: !todo.completed }
            }
            return todo
        })
        updateLocalStorage()
    }

    function removeTodo(index) {
        todoList = todoList.filter((_, i) => i !== index)
        updateLocalStorage()
    }

    // 更新localStorage中的待办事项列表
    function updateLocalStorage() {
        setStorage('todos', todoList)
    }
    $: filteredTodos = todoList.filter((todo) => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true // filter === 'all'
    })
</script>

<section
    transition:fly={{ y: 700, duration: 200, opacity: 1 }}
    use:draggable={{
        handle: '.topbar'
    }}
    class="absolute w-80 left-[calc(50%-10rem)] top-[calc(50%-10rem)] bg-white rounded-lg shadow overflow-hidden">
    <Topbar label="待办事项" />
    <div class="px-4 py-3 flex items-center justify-between">
        <h3>{filteredTodos.length}件</h3>
        <div class="flex gap-2 text-sm">
            <button on:click={() => (filter = 'all')}>全部</button>
            <button on:click={() => (filter = 'active')}>待办</button>
            <button on:click={() => (filter = 'completed')}>完成</button>
        </div>
    </div>

    <div class="overflow-y-auto max-h-96 scrollbar transition-all">
        <ul class="flex flex-col">
            {#if filteredTodos.length === 0}
                <div class="w-full h-20 flex justify-center items-center">
                    <Icon
                        icon="emojione-v1:warning"
                        width="80"
                        height="80" />
                </div>
            {/if}
            {#each filteredTodos as todo, index}
                <li
                    key={index}
                    class="flex items-center justify-between gap-4 py-3 px-4 border-t border-black/5"
                    class:bg-green-100={todo.completed}
                    class:line-through={todo.completed}
                    transition:fade={{ duration: 200, opacity: 1 }}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        class="shrink-0 form-tick appearance-none bg-white bg-[url('https://www.tailwind-kit.com/icons/check.svg')] h-4 w-4 border border-gray-300 rounded-md checked:bg-green-500 checked:border-transparent focus:outline-none"
                        on:change={() => toggleCompletion(index)} />
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        type="button"
                        class="grow break-words truncate"
                        on:click={() => toggleCompletion(index)}>
                        {todo.text}
                    </div>
                    {#if todo.completed}
                        <button
                            class=""
                            on:click={() => removeTodo(index)}>
                            <Icon
                                icon="solar:trash-bin-minimalistic-2-bold-duotone"
                                color="red" />
                        </button>
                    {/if}
                </li>
            {/each}
        </ul>
        <form
            on:submit={addTodo}
            class="flex gap-4 px-4 items-center justify-center border-t border-gray-200">
            <input
                type="text"
                bind:value={newTodo}
                class="w-full p-2 focus:outline-none"
                placeholder="输入待办事项" />
            <button
                type="submit"
                class=""><Icon icon="material-symbols:add" /></button>
        </form>
    </div>
</section>
