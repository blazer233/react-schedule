import './style.css'
import performWorkUntilDeadline from './reactSchedule'
import { handleWork } from './tools'
import taskModule from './task'
const mainEl = document.querySelector("#box")

let temp
const mainWork = () => {
    const style = mainEl.getBoundingClientRect()
    if (style.left <= 0) {
        temp = 2
    } else if (style.left >= 500) {
        temp = -2
    }
    mainEl.style.left = style.left + temp + 'px'
    requestAnimationFrame(mainWork)
}
// 主进程
mainWork()

// 模拟react不卡顿主进程的方式
// setInterval(() => {
//     performWorkUntilDeadline()
// }, 2000)

//卡顿模式
setInterval(() => {
    taskModule.taskQueue.forEach(i => handleWork(i))
}, 2000)