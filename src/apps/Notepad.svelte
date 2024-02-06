<script>
    import { draggable } from '@neodrag/svelte'
    import { fly } from 'svelte/transition'
    import Topbar from '../components/topbar.svelte'
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte'
    import { getStorage, setStorage } from '../utils/storage'
    import Icon from '@iconify/svelte'
    let notes = writable([])
    let selectedNoteId = writable(null)
    let textArea

    onMount(() => {
        const storedNotes = getStorage('notes')
        if (storedNotes) {
            notes.set(storedNotes)
        }
    })

    function addNote() {
        const newNote = {
            id: Date.now(),
            content: ''
        }
        notes.update((n) => {
            const updatedNotes = [...n, newNote]
            setStorage('notes', updatedNotes)
            return updatedNotes
        })
        selectedNoteId.set(newNote.id)
        setTimeout(() => {
            textArea && textArea.focus()
        }, 0)
    }
    function deleteNote(id) {
        notes.update((currentNotes) => {
            const updatedNotes = currentNotes.filter((note) => note.id !== id)
            setStorage('notes', updatedNotes) // 更新localStorage
            return updatedNotes
        })
        // 如果删除的是当前选中的笔记，则清除选中状态
        selectedNoteId.set(null)
    }
    function updateNoteContent(id, newContent) {
        notes.update((n) => {
            const updatedNotes = n.map((note) => {
                if (note.id === id) {
                    return { ...note, content: newContent }
                }
                return note
            })
            setStorage('notes', updatedNotes)
            return updatedNotes
        })
    }
    function downloadNoteContent(content, filename) {
        // 创建Blob对象并指定类型
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })

        // 利用Blob对象创建临时URL
        const url = URL.createObjectURL(blob)

        // 使用现代JavaScript功能简化元素创建和配置
        const a = document.createElement('a')
        Object.assign(a, {
            href: url,
            download: `${filename}.txt` // 设置下载文件名
        })

        // 触发下载操作
        a.click()

        // 清理操作
        URL.revokeObjectURL(url)
    }
    const selectNote = (id) => {
        selectedNoteId.set(id)
        setTimeout(() => {
            textArea && textArea.focus()
        }, 0)
    }

    const getTitle = (content) => {
        if (!content.trim()) return '新建记事'

        const firstLine = content.split('\n')[0]

        return firstLine.substring(0, 15) + (firstLine.length > 15 ? '...' : '')
    }
</script>

<section
    transition:fly={{ y: 700, duration: 200, opacity: 1 }}
    use:draggable={{
        handle: '.topbar'
    }}
    class="absolute w-[48rem] h-[min(100%-4rem,620px)] left-[calc(50%-24rem)] top-[calc(50%-calc(min(100%-4rem,620px)/2))] bg-white rounded-lg shadow overflow-hidden">
    <Topbar label="记事本" />
    <div class="p-4 flex w-full h-[calc(100%-2.25rem)]">
        <div
            class="w-60 pr-4 border-r border-gray-200 gap-2 flex flex-col justify-between">
            <div class="grow max-h-full overflow-y-auto scrollbar">
                {#each $notes as note (note.id)}
                    <div
                        class="flex gap-2 items-center justify-between hover:bg-gray-100 cursor-pointer p-2 rounded group duration-150">
                        <button
                            class="grow text-left"
                            on:click={() => selectNote(note.id)}>
                            {getTitle(note.content)}
                        </button>
                        <div
                            class="flex w-fit gap-2 opacity-0 group-hover:opacity-100 duration-150">
                            <button
                                class=""
                                on:click={(event) => {
                                    event.stopPropagation() // 阻止事件冒泡
                                    deleteNote(note.id)
                                }}>
                                <Icon
                                    icon="solar:trash-bin-minimalistic-2-bold-duotone"
                                    color="red" />
                            </button>
                            <button
                                class=""
                                on:click={(event) => {
                                    event.stopPropagation() // 阻止事件冒泡
                                    downloadNoteContent(
                                        note.content,
                                        getTitle(note.content) || 'note'
                                    )
                                }}>
                                <Icon icon="solar:cloud-download-linear" />
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
            <button
                type="button"
                class="w-full py-2 px-3 rounded-full bg-blue-400 text-white"
                on:click={addNote}>新增记事</button>
        </div>
        <div class="grow">
            {#if $selectedNoteId !== null}
                {#each $notes as note (note.id)}
                    {#if note.id === $selectedNoteId}
                        <textarea
                            class="w-full h-full pl-4 focus:outline-none resize-none overflow-x-hidden overscroll-y-auto scrollbar"
                            bind:value={note.content}
                            bind:this={textArea}
                            on:blur={() =>
                                updateNoteContent(note.id, note.content)}
                        ></textarea>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
</section>
