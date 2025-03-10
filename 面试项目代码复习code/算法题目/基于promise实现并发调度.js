class Scheduler {
    constructor(maxConcurrency) {
        this.maxConcurrency = maxConcurrency; // 最大并发量
        this.runningCount = 0; // 当前正在运行的任务数
        this.queue = []; // 任务队列
    }

    add(promiseCreator) {
        return new Promise((resolve, reject) => {
            // 将任务包装成一个对象，包含 promiseCreator 和 resolve/reject
            const task = {
                promiseCreator,
                resolve,
                reject,
            };

            // 将任务加入队列
            this.queue.push(task);

            // 尝试执行下一个任务
            this.run();
        });
    }

    run() {
        // 如果当前运行的任务数未达到最大并发量，并且队列中有任务
        while (this.runningCount < this.maxConcurrency && this.queue.length > 0) {
            const task = this.queue.shift(); // 取出队列中的第一个任务
            this.runningCount++; // 增加正在运行的任务数

            task.promiseCreator()
                .then((result) => {
                    task.resolve(result); // 任务成功，调用 resolve
                })
                .catch((error) => {
                    task.reject(error); // 任务失败，调用 reject
                })
                .finally(() => {
                    this.runningCount--; // 任务完成，减少正在运行的任务数
                    this.run(); // 尝试执行下一个任务
                });
        }
    }
}

// 示例用法
const scheduler = new Scheduler(2); // 最大并发量为 2

const timeout = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, 1); // 1s 后输出 1
addTask(500, 2);  // 0.5s 后输出 2
addTask(300, 3);  // 0.8s 后输出 3 (因为前两个任务占用了并发量)
addTask(400, 4);  // 1.2s 后输出 4
