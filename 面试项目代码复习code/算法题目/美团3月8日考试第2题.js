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
        for (let j = 0; j < n; j++) {
            const { x: xj, y: yj} = cannons[j];
            if (xj === x && yj > y) {
                count++;
                break;
            }
        }
        
        // 向下攻击
        for (let j = 0; j < n; j++) {
            const {x: xj, y: yj} = cannons[j];
            if (xj === x && yj < y) {
                count++;
                break;
            }
        }
        
        // 向左攻击
        for (let j = 0; j < n; j++) {
            const {x: xj, y: yj} = cannons[j];
            if (yj === y && xj < x) {
                count++;
                break;
            }
        }
        
        // 向右攻击
        for (let j = 0; j < n; j++) {
            const { x: xj, y: yj} = cannons[j];
            if (yj === y && xj > x) {
                count++;
                break;
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
