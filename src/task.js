const obj = { name: 'div', text: 'hello worldhello worldhello' }
const taskModule = { taskQueue: [], pop: arr => arr.pop() }

let num = 1
while (num < 5000) {
    taskModule.taskQueue.push({ ...obj })
    num++
}

export default taskModule