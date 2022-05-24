import {
    unstable_ImmediatePriority as ImmediatePriority,
    unstable_LowPriority as LowPriority,
    unstable_NormalPriority as NormalPriority,
    unstable_UserBlockingPriority as UserBlockingPriority,
} from "scheduler";
export const priorityList = [{
        label: "低优先级",
        value: LowPriority,
    },
    {
        label: "正常",
        value: NormalPriority,
    },
    {
        label: "立即",
        value: ImmediatePriority,
    },
    {
        label: "用户行为",
        value: UserBlockingPriority,
    },
];
export const priorityColor = {
    [LowPriority]: "red",
    [ImmediatePriority]: "green",
    [NormalPriority]: "black",
    [UserBlockingPriority]: "orange",
};
// export const sleep = (s) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, s)
//     });
// }

export const sleeps = (s) => {
    return new Promise((resolve) => {
        let result = 0;
        while (result < s) {
            result++
        }
        resolve()
    });
}