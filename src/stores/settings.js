import { writable } from 'svelte/store'
import { getStorage, setStorage } from '../utils/storage'
import { defaultConfig } from '../config'

function createSettingStore() {
    const LOCAL_STORAGE_KEY = 'settings';
    const storedSettings = getStorage(LOCAL_STORAGE_KEY);
    const { subscribe, update } = writable(storedSettings || defaultConfig);

    return {
        subscribe,
        updateSetting(key, value) {
            update((currentSettings) => {
                // 只有在值发生变化时才更新
                if (currentSettings[key] !== value) {
                    const updatedConfig = { ...currentSettings, [key]: value };
                    setStorage(LOCAL_STORAGE_KEY, updatedConfig);
                    return updatedConfig;
                }
                return currentSettings;
            });
        }
    };
}

export const settings = createSettingStore()
export let activeThing = writable('')
export const openedApps = writable([])
