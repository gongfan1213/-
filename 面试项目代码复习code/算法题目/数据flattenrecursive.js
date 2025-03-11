// function flattenRecursive(arr, depth = 1) {
//     // 如果深度小于等于0，直接返回原数组
//     if (depth <= 0) return arr;
    
//     // 使用 reduce 遍历数组
//     return arr.reduce((acc, item) => {
//         // 如果当前元素是数组且深度未达到，递归扁平化
//         if (Array.isArray(item) && depth > 0) {
//             return acc.concat(flattenRecursive(item, depth - 1));
//         } else {
//             return acc.concat(item);
//         }
//     }, []);
// }
function flattenWhile(arr, depth = 1) {
    // 如果深度小于等于0，直接返回原数组
    if (depth <= 0) return arr;
    
    // 复制数组以避免修改原数组
    let result = [...arr];
    
    // 循环直到达到指定深度或没有嵌套数组
    while (depth > 0 && result.some(Array.isArray)) {
        result = [].concat(...result); // 展开一层
        depth--;
    }
    
    return result;
}