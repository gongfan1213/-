function lengthOfLongestSubstring(s) {
    // 使用map来存储字符最后出现的位置
    const map = new Map();
    let maxLen = 0;
    let left = 0; // 滑动窗口的左边界

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        // 如果字符已经存在，并且位置在窗口内，移动左边界
        if (map.has(char) && map.get(char) >= left) {
            left = map.get(char) + 1;
        }
        // 更新字符最后出现的位置
        map.set(char, right);
        // 计算当前窗口大小
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// 示例用法
console.log(lengthOfLongestSubstring("abcabcbb")); // 输出: 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 输出: 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 输出: 3