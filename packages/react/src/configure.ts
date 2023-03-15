/**
 * 为了设置 wrap 的默认值
 *
 * 在其他对应 control 组件中引入该变量，并 push 将其默认设置为 wrap 换行模式
 * 该种默认设置后，可以通过传入 `no-wrap` 使得其不换行
 * 例如：
 * ```js
 * import { NeedWrapRoles } from 'schemastery-react'
 * NeedWrapRoles.push('code', /^code/)
 * ```
 */
export const NeedWrapRoles: (string | RegExp)[] = []
