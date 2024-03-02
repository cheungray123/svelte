import { writable } from 'svelte/store';

const TIMEOUT = 3000; // 默认超时时间

function createNotificationStore(defaultTimeout = TIMEOUT) {
    const _notifications = writable([]);

    function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function remove(id) {
        _notifications.update(n => n.filter(notification => notification.id !== id));
    }

    return {
        subscribe: _notifications.subscribe,
        send: (message, type = "default", timeout = defaultTimeout) => {
            const notification = { id: generateId(), type, message, timeout };
            _notifications.update(n => [...n, notification]);

            setTimeout(() => {
                remove(notification.id);
            }, notification.timeout);
        },
        remove,
        default: (message, timeout) => send(message, "default", timeout),
        danger: (message, timeout) => send(message, "danger", timeout),
        warning: (message, timeout) => send(message, "warning", timeout),
        info: (message, timeout) => send(message, "info", timeout),
        success: (message, timeout) => send(message, "success", timeout),
    }
}

export const notifications = createNotificationStore();
