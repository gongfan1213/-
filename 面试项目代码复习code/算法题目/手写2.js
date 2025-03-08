// 求一个字符串中的最长不连续子串长度
//滑动窗口
//使用一个set数据解构存储当前窗口内的字符，因为set可以快速判断一个字符是否已经存在于集合当中的
//初始化两个指针left和right分别指向了滑动窗口的左右边界，初始的时候都指向了字符串的起始位置
//初始化一个变量maxLength用于记录最长不连续子串的长度初始值是0
//右指针right不断向右移动，将字符添加到set中，每次添加一个字符，检查字符串是否已经存在set当中
//如果字符串已经存在于set当中说明出现重复字符，需要移动左指针left并且从set中移除左指针，直到重复字符被移除
//更新最大长度
//每次移动右指针，计算当前窗口的长度、
function lengthOfLongestSubstring(s) {
    // 用于存储当前窗口内的字符
    const charSet = new Set();
    // 左指针，初始化为 0
    let left = 0;
    // 记录最长不连续子串的长度，初始化为 0
    let maxLength = 0;

    // 右指针从 0 开始遍历字符串
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        // 当出现重复字符时，移动左指针并移除字符
        while (charSet.has(currentChar)) {
            charSet.delete(s[left]);
            left++;
        }
        // 将当前字符添加到 Set 中
        charSet.add(currentChar);
        // 更新最大长度
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// 测试示例
const str = "abcabcbb";
console.log(lengthOfLongestSubstring(str)); 