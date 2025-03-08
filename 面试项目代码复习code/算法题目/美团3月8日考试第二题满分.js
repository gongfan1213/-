//已知每个炮的攻击方式是，先选一个攻击方向（上下左右），该方向上看见的第一个棋子为炮架，该炮可以通过炮架攻击到炮架后面的其中（只能攻击到炮架的后面第一个），小美希望你求出每个炮的第一次攻击能攻击到多少个炮，输入描述：第一行输入一个正整数n，代表炮的数量，接下来的n行，每一行输入两个整数xi,yi,代表每一个炮所在的坐标，输出描述，输出n行，每一行输出一个整数，代表第i个炮可以攻击到的炮的数量​
//运行超时，用例通过率20%
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const n = parseInt(await readline());
    const cannons = [];
    for (let i = 0; i < n ; i++) {
        const [x, y] = (await readline()).split(' ').map(Number);
        cannons.push({x, y, i});
    }

    // 预处理数据
    const xMap = new Map();
    const yMap = new Map();
    for (const cannon of cannons) {
        const { x, y } = cannon;
        if (!xMap.has(x)) xMap.set(x, []);
        if (!yMap.has(y)) yMap.set(y, []);
        xMap.get(x).push(cannon);
        yMap.get(y).push(cannon);
    }

    // 对每个方向的坐标进行排序
    for (const [x, arr] of xMap) {
        arr.sort((a, b) => a.y - b.y);
    }
    for (const [y, arr] of yMap) {
        arr.sort((a, b) => a.x - b.x);
    }

    for (let i = 0; i < n; i++) {
        let count = 0;
        const { x, y } = cannons[i];

        // 向上攻击
        const upArr = xMap.get(x);
        if (upArr) {
            const idx = binarySearch(upArr, y, 'y');
            if (idx < upArr.length - 1) {
                const next = upArr[idx + 1];
                if (next.y > y) {
                    if (idx < upArr.length - 2) {
                        count++;
                    }
                }
            }
        }

        // 向下攻击
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

        // 向右攻击
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
// 自测输入
// 6
// 0 0
// 0 1
// 0 2
// 1 0
// 2 0
// 3 0
// 预期输出
// 2
// 0
// 1
// 1
// 1
// 1
