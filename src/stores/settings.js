import { writable } from 'svelte/store';
import { getStorage, setStorage } from '../utils/storage';
import { defaultConfig } from '../config';

function createSettingStore() {
    const LOCAL_STORAGE_KEY = 'settings';
    const initialSettings = getStorage(LOCAL_STORAGE_KEY) || defaultConfig;
    const { subscribe, set } = writable(initialSettings);

    // 直接在返回的对象中定义方法
    return {
        subscribe,
        updateSetting: (key, value) => {
            set((currentSettings) => {
                if (currentSettings[key] !== value) {
                    const updatedSettings = { ...currentSettings, [key]: value };
                    setStorage(LOCAL_STORAGE_KEY, updatedSettings);
                    return updatedSettings;
                }
                return currentSettings;
            });
        },
    };
}

export const settings = createSettingStore();
