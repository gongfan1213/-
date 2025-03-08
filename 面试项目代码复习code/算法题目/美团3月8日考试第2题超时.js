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
        cannons.push({x, y});
    }

    for (let i = 0; i < n ; i++) {
        let count = 0;
        const { x, y } = cannons[i];
        
        // 向上攻击
        let minY = Infinity;
        let target = null;
        for (let j = 0; j < n; j++) {
            const { x: xj, y: yj} = cannons[j];
            if (xj === x && yj > y && yj < minY) {
                minY = yj;
                target = j;
            }
        }
        if (target !== null) {
            for (let j = 0; j < n; j++) {
                const { x: xj, y: yj} = cannons[j];
                if (xj === x && yj > minY) {
                    count++;
                    break;
                }
            }
        }
        
        // 向下攻击
        let maxY = -Infinity;
        target = null;
        for (let j = 0; j < n; j++) {
            const { x: xj, y: yj} = cannons[j];
            if (xj === x && yj < y && yj > maxY) {
                maxY = yj;
                target = j;
            }
        }
        if (target !== null) {
            for (let j = 0; j < n; j++) {
                const { x: xj, y: yj} = cannons[j];
                if (xj === x && yj < maxY) {
                    count++;
                    break;
                }
            }
        }
        
        // 向左攻击
        let maxX = -Infinity;
        target = null;
        for (let j = 0; j < n; j++) {
            const { x: xj, y: yj} = cannons[j];
            if (yj === y && xj < x && xj > maxX) {
                maxX = xj;
                target = j;
            }
        }
        if (target !== null) {
            for (let j = 0; j < n; j++) {
                const { x: xj, y: yj} = cannons[j];
                if (yj === y && xj < maxX) {
                    count++;
                    break;
                }
            }
        }
        
        // 向右攻击
        let minX = Infinity;
        target = null;
        for (let j = 0; j < n; j++) {
            const { x: xj, y: yj} = cannons[j];
            if (yj === y && xj > x && xj < minX) {
                minX = xj;
                target = j;
            }
        }
        if (target !== null) {
            for (let j = 0; j < n; j++) {
                const { x: xj, y: yj} = cannons[j];
                if (yj === y && xj > minX) {
                    count++;
                    break;
                }
            }
        }
        
        console.log(count);
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
