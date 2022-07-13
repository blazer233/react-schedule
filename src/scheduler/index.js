import {
  unstable_IdlePriority as IdlePriority,
  unstable_ImmediatePriority as ImmediatePriority,
  unstable_cancelCallback as cancelCallback,
  unstable_getFirstCallbackNode as getFirstCallbackNode,
  unstable_scheduleCallback as scheduleCallback,
  unstable_shouldYield as shouldYield,
} from "scheduler";
import { priorityList, priorityColor, sleeps, sleep } from "./config";
// 任务队列
const taskQueue = [];
const root = document.querySelector("#root");
const content = document.querySelector("#content");

priorityList.forEach(({ label, value }) => {
  const btn = document.createElement("button");
  btn.innerText = `${label} : ${value}`;
  btn.style.color = priorityColor[value];
  root.appendChild(btn);
  // 相当于react中的state更新
  btn.onclick = () => {
    // 添加任务
    taskQueue.push({
      priority: value,
      count: 100,
    });
    // 开启调度
    schedule();
  };
});

// 调度逻辑
// 当前运行的callback函数
let curCallback = null;
// 前一个函数的优先级
let prevPriority = IdlePriority;

function schedule() {
  // 获取当前调度的节点
  const cbNode = getFirstCallbackNode();
  // 获取要加入调度的任务
  const curTask = taskQueue.sort((a, b) => a.priority - b.priority)[0];
  console.log(taskQueue);
  debugger;
  if (!curTask) {
    curCallback = null;
    // 边界情况
    cbNode && cancelCallback(cbNode);
    return;
  }
  // 判断当前任务优先级，是否需要调度
  const curPriority = curTask.priority;

  // 说明还有任务在运行当中，新的最高优先级并不高于它，所以这个任务不能被中止, (这里就是前一个任务是被暂停的，需要继续运行)
  if (curPriority === prevPriority) return;

  // 其他情况，取消掉任务调度，说明任务需要被打断，或者需要执行一个新的任务
  // 这里不可能存在curPriority < prevPriority的情况，因为上一步中取出来的task，
  // 就是优先级最高的task了,因为到这里的时候，任务执行完的话，prevPriority = IdlePriority
  cbNode && cancelCallback(cbNode);

  curCallback = scheduleCallback(curPriority, perform.bind(null, curTask));
}
// 具体的执行代码
function perform(task, didTimeout) {
  // 获取当前任务是否为同步或者过期
  const needSync = task.priority === ImmediatePriority || didTimeout;
  while ((needSync || !shouldYield()) && task.count) {
    task.count--;
    render(task.priority);
  }

  // 上一个执行的任务优先级设置为
  prevPriority = task.priority;

  // 判断task是否运行完成
  if (!task.count) {
    prevPriority = IdlePriority;
    taskQueue.shift();
  }

  // 进行新一轮的调度
  const prevCallback = curCallback;
  schedule();
  const newCallback = curCallback;

  // 如果新的回调函数 === 前一个回调函数，那么继续执行回调，这里是一个性能优化
  if (newCallback && prevCallback === newCallback)
    return perform.bind(null, task);
}

// 更新渲染
async function render(num) {
  // await sleeps(100000)
  // await sleep(2000);
  const span = document.createElement("span");
  const text = num;
  span.innerText = `${text}`;
  span.setAttribute("style", `color:${priorityColor[`${text}`]}`);
  content.appendChild(span);
  console.log(22222222222);
}
