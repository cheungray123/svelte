/**
 * 将一个对象储存在本地存储中
 *
 * @param {string} key - 要储存的键名
 * @param {object} value - 要储存的对象
 *
 * @throws {TypeError} 如果 value 是一个简单类型数据（数字或字符串），则抛出 TypeError 异常
 */
export const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 从本地存储中获取一个对象
 *
 * @param {string} key - 要获取的键名
 * @returns {object|null} 储存在本地存储中的对象，如果不存在则返回 null
 *
 * @throws {SyntaxError} 如果本地存储中存储的值无法解析为 JSON，则抛出 SyntaxError 异常
 */
export const getStorage = (key) => {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    } catch (e) {
        console.error(e)
        return null
    }
}
