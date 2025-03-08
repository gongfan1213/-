// 创建readline接口，用于从标准输入读取数据
const rl = require("readline").createInterface({ input: process.stdin });

// 创建异步迭代器，用于逐行读取输入
var iter = rl[Symbol.asyncIterator]();

// 定义异步函数readline，用于获取下一行输入
const readline = async () => (await iter.next()).value;

// 定义立即执行的异步函数
void async function () {
    // 读取炮的数量n
    const n = parseInt(await readline());
    
    // 存储所有炮的坐标和索引
    const cannons = [];
    for (let i = 0; i < n ; i++) {
        // 读取每个炮的坐标
        const [x, y] = (await readline()).split(' ').map(Number);
        // 存储炮的坐标和原始索引
        cannons.push({x, y, i});
    }

    // 预处理数据：创建两个Map用于快速查找
    const xMap = new Map(); // 按x坐标分组
    const yMap = new Map(); // 按y坐标分组
    for (const cannon of cannons) {
        const { x, y } = cannon;
        // 初始化x坐标对应的数组
        if (!xMap.has(x)) xMap.set(x, []);
        // 初始化y坐标对应的数组
        if (!yMap.has(y)) yMap.set(y, []);
        // 将炮添加到对应的分组中
        xMap.get(x).push(cannon);
        yMap.get(y).push(cannon);
    }

    // 对每个方向的坐标进行排序
    // 按y坐标排序，用于上下攻击
    for (const [x, arr] of xMap) {
        arr.sort((a, b) => a.y - b.y);
    }
    // 按x坐标排序，用于左右攻击
    for (const [y, arr] of yMap) {
        arr.sort((a, b) => a.x - b.x);
    }

    // 计算每个炮的攻击数量
    for (let i = 0; i < n; i++) {
        let count = 0;
        const { x, y } = cannons[i];

        // 向上攻击
        const upArr = xMap.get(x);
        if (upArr) {
            // 使用二分查找找到当前炮的位置
            const idx = binarySearch(upArr, y, 'y');
            // 检查上方是否有炮
            if (idx < upArr.length - 1) {
                const next = upArr[idx + 1];
                // 确认上方的炮确实在当前炮的上方
                if (next.y > y) {
                    // 检查上方第二个炮是否存在
                    if (idx < upArr.length - 2) {
                        count++;
                    }
                }
            }
        }

        // 向下攻击（逻辑与向上攻击类似）
        if (upArr) {
            const idx = binarySearch(upArr, y, 'y');
            if (idx > 0) {
                const prev = upArr[idx - 1];
                if (prev.y < y) {
                    if (idx > 1) {
                        count++;
                    }
                }
            }
        }

        // 向左攻击
        const leftArr = yMap.get(y);
        if (leftArr) {
            const idx = binarySearch(leftArr, x, 'x');
            if (idx > 0) {
                const prev = leftArr[idx - 1];
                if (prev.x < x) {
                    if (idx > 1) {
                        count++;
                    }
                }
            }
        }

        // 向右攻击（逻辑与向左攻击类似）
        if (leftArr) {
            const idx = binarySearch(leftArr, x, 'x');
            if (idx < leftArr.length - 1) {
                const next = leftArr[idx + 1];
                if (next.x > x) {
                    if (idx < leftArr.length - 2) {
                        count++;
                    }
                }
            }
        }

        // 输出当前炮的攻击数量
        console.log(count);
    }

    // 二分查找辅助函数
    function binarySearch(arr, val, key) {
        let left = 0, right = arr.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid][key] === val) return mid;
            if (arr[mid][key] < val) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
}();
// 实现原理：

// 数据预处理：

// 使用两个Map（xMap和yMap）分别按x坐标和y坐标对炮进行分组
// 对每个分组中的炮进行排序，方便后续查找
// 攻击计算：

// 对于每个炮，分别在四个方向（上、下、左、右）进行攻击计算
// 使用二分查找快速定位当前炮在排序数组中的位置
// 检查是否存在炮架（第一个炮）和攻击目标（第二个炮）
// 如果存在攻击目标，则count加1
// 优化点：

// 使用Map进行分组，减少查找范围
// 使用排序和二分查找，将时间复杂度从O(n^2)降低到O(nlogn)
// 通过预处理数据，避免重复计算
// 示例执行过程：

// 以输入示例为例：


// plainText
// 6
// 0 0
// 0 1
// 0 2
// 1 0
// 2 0
// 3 0
// 对于第一个炮(0,0)：

// 向上攻击：找到炮架(0,1)，攻击目标(0,2)，count=1
// 向右攻击：找到炮架(1,0)，攻击目标(2,0)，count=2
// 最终输出：2
// 对于第二个炮(0,1)：

// 没有可以攻击的目标
// 最终输出：0
// 这个实现通过优化数据结构和算法，提高了计算效率，能够处理更大规模的数据。