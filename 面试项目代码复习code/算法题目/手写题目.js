// var entry = {
//     'a.b.c.dd': 'abcdd',
//     'a.d.xx': 'adxx',
//     'a.e': 'ae',
// };

// // 要求转换成如下对象
// var output = {
//     a: {
//         b: {
//             c: {
//                 dd: 'abcdd',
//             },
//         },
//         d: {
//             xx: 'adxx',
//         },
//         e: 'ae',
//     },
// };

// 作者：芝士小堡
// 链接：https://www.nowcoder.com/feed/main/detail/6f59657daaea4adaa44d1a3ee539c444?sourceSSR=search
// 来源：牛客网
var entry = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae',
};
function convertObject(entry) {
    const output ={};
    for(const key in entry) {
        const path = key.split('.');
        let current = output;
        for(let i = 0;i<path.length;i++) {
            const part = path[i];
            if(i===path.length-1){
                current[key] = entry[key];
            }else {
                if(!current[part]){
                    current[part] = {};
                }
                current = current[part];
            }
        }
    }
}