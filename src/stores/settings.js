import { writable } from 'svelte/store'
import { getStorage, setStorage } from '../utils/storage'
import { defaultConfig } from '../config'

function createSettingStore() {
    const LOCAL_STORAGE_KEY = 'settings'
    const storedSettings = getStorage(LOCAL_STORAGE_KEY)
    const { subscribe, update } = writable(storedSettings || defaultConfig)

    return {
        subscribe,
        handleChange(key, value) {
            update((v) => {
                if (!(key in v)) return v

                let newValue
                if (typeof v[key] === 'boolean') {
                    newValue = !v[key]
                } else if (typeof v[key] === 'string' && value !== null) {
                    newValue = value
                } else {
                    newValue = v[key]
                }

                const updatedConfig = { ...v, [key]: newValue }
                setStorage(LOCAL_STORAGE_KEY, updatedConfig)
                return updatedConfig
            })
        }
    }
}

export const settings = createSettingStore()
export let activeThing = writable('')
export const openedApps = writable([])
