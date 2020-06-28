/* 链接是否合法 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}