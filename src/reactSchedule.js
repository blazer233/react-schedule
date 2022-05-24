import { getCurrentTime, yieldInterval, handleWork, } from './tools'
let deadline = 0 //每一帧间隔剩余空闲时间
const taskModule = new Array(5000).fill({ name: 'div', text: 'hello worldhello worldhello' })

//当前帧剩余时间 = 当前帧结束时间(frameDeadline) - 当前帧花费的时间

// 执行任务
const scheduledHostCallback = (hasTimeRemaining) => {
    // 使用数组实现
    while (taskModule.length > 0) {
        // 如果真的该停了就不要中断
        if (!hasTimeRemaining || getCurrentTime() >= deadline) break
        // 依次执行
        const task = taskModule.pop()
        handleWork(task)
    }
    if (taskModule.length > 0) { // 数组模拟链表，继续节点执行
        return true
    } else {
        return false
    }
}
/**
 * deadline 计算每一帧间隔剩余空闲时间
 */
const performWorkUntilDeadline = () => {
    const currentTime = getCurrentTime();
    deadline = currentTime + yieldInterval
    // 假设还有时间 先干活试试的
    const hasTimeRemaining = true
    // 默认都有活做， 还有一个目的就是
    // 当try中的workLoop中存在耗时操作
    // 会默认当作这次操作超出了这次deadline
    // 也会直接让出主进程，开启下一个宏任务再去做。
    let hasMoreWork = true
    try {
        hasMoreWork = scheduledHostCallback(hasTimeRemaining)
    } finally {
        if (hasMoreWork) {
            port2.postMessage(null)
        }
    }
}

// 实例化MessageChannel
const { port1, port2 } = new MessageChannel()
port1.onmessage = performWorkUntilDeadline

export default performWorkUntilDeadline