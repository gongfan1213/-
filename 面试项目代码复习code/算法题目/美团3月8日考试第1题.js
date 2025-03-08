// //用力通过率都是100%
// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void async function () {
//    const T = parseInt(await readline());
//    for (let i = 0; i < T; i++) {
//     let s = await readline();
//     let q = 0;
//     let t = '';
    
//     for(let j = 0; j <s.length ; j++) {
//         if (/\d/.test(s[j])) {  // 修改正则表达式，正确匹配数字
//             if (q === 0) {
//                 q = parseInt(s[j]);
//             } else {
//                 q = q * 10 + parseInt(s[j]);
//             }
//         } else {
//             if ( q > 0) {
//                 if (t.length > 0) {  // 添加长度判断
//                     const rotate = q % t.length;  // 处理q大于字符串长度的情况
//                     t = t.substring(rotate) + t.substring(0, rotate);
//                 }
//                 q = 0;
//             }
//             if (s[j] === "R") {
//                 t = t.split('').reverse().join('');

//             } else {
//                 t += s[j];
//             }
//         }
//     }
//     console.log(t);
//    }
// }();
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
        for (let j = i + 1; j < n; j++) {
            const { x: xj, y: yj} = cannons[j];
            if (xj === x && yj > y) {
                count ++;
            } else {
                break;
            }
        }
    }
    //向下攻击
    for (let j = i + 1 ; j < n; j++) {
        const {x: xj, y: yj} = cannons[j];
        if (xj === x && yj < y) {
            if (count === 0) {
                count ++;
            } else {
                break;
            }
        }
    }
    //向左攻击
    for (let j = i + 1;j < n; j++) {

        const {x: xj, y: yj} = cannons[j];
        if (yj === y && xj < x) {
            if(count === 0) {
                count ++;
            } else {
                break;
            }
        }
    }
    for (let j = i + 1; j < n; j++) {
        const { x: xj, y: yj} = cannons[j];
        if (yj === y && xj > x) {
            if (count ===0 ) {
                count ++;
            } else {
                break;
            }
        }
    }
    console.log(count);
}()
