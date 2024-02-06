import { writable } from 'svelte/store'
import { getStorage, setStorage } from './utils/storage'
import config from './data/config.json'
function createSettingStore() {
    const LOCAL_STORAGE_KEY = 'settings'
    const storedSettings = getStorage(LOCAL_STORAGE_KEY)
    const { subscribe, update } = writable(storedSettings || config)

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

// 使用函数来更新openedApps和activeThing
const toggleOpenApp = (app) => {
    openedApps.update((currentApps) => {
        if (currentApps.includes(app)) {
            activeThing.set('')
            return currentApps.filter((oa) => oa !== app)
        } else {
            activeThing.set(app)
            return [...currentApps, app]
        }
    })
}
