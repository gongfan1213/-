### 1. 使用哈希表（不满足常量额外空间要求，但思路简单）
哈希表可以记录每个数字出现的次数。遍历数组，将数字作为键，出现次数作为值存储在哈希表中。最后再遍历哈希表，找出出现次数为 1 的数字。

```typescript
function singleNumberByHashTable(nums: number[]): number {
    const hashTable: Record<number, number> = {};
    for (const num of nums) {
        if (hashTable[num]) {
            hashTable[num]++;
        } else {
            hashTable[num] = 1;
        }
    }
    for (const num in hashTable) {
        if (hashTable[num] === 1) {
            return parseInt(num);
        }
    }
    return -1; 
}
```

### 2. 排序后遍历
先对数组进行排序，排序后相同的数字会相邻。然后遍历数组，比较相邻元素，如果相邻元素不相等，则前一个元素就是只出现一次的元素；如果遍历到最后都没有找到，则数组的最后一个元素是只出现一次的元素。

```typescript
function singleNumberBySort(nums: number[]): number {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 1; i += 2) {
        if (nums[i] !== nums[i + 1]) {
            return nums[i];
        }
    }
    return nums[nums.length - 1];
}
```

### 3. 数学方法
利用集合去重，假设数组中所有不同数字的和为 $S_{unique}$，数组中所有数字的和为 $S_{total}$。因为除了一个数字只出现一次，其余数字都出现两次，所以 $2\times S_{unique}-S_{total}$ 就是只出现一次的数字。

```typescript
function singleNumberByMath(nums: number[]): number {
    const uniqueSet = new Set(nums);
    let sumOfUnique = 0;
    let sumOfTotal = 0;
    for (const num of nums) {
        sumOfTotal += num;
    }
    for (const num of uniqueSet) {
        sumOfUnique += num;
    }
    return 2 * sumOfUnique - sumOfTotal;
}
```

### 复杂度分析
| 方法 | 时间复杂度 | 空间复杂度 |
| ---- | ---- | ---- |
| 哈希表 | $O(n)$ | $O(n)$ |
| 排序后遍历 | $O(n log n)$ | $O(log n)$（取决于排序算法的实现） |
| 数学方法 | $O(n)$ | $O(n)$ |
| 异或运算 | $O(n)$ | $O(1)$ |

在这些方法中，异或运算的空间复杂度最优，为常量级；而哈希表和数学方法虽然时间复杂度为线性，但空间复杂度为 $O(n)$；排序后遍历的时间复杂度为 $O(n log n)$。 

为了找出数组中只出现一次的元素，且满足线性时间复杂度（$O(n)$）和常量额外空间（$O(1)$）的要求，我们可以使用异或运算的特性。

异或运算（`^`）具有以下性质：
1. 任何数和 0 做异或运算，结果仍然是原来的数，即 `a ^ 0 = a`。
2. 任何数和其自身做异或运算，结果是 0，即 `a ^ a = 0`。
3. 异或运算满足交换律和结合律，即 `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b`。

基于这些性质，我们可以对数组中的所有元素进行异或运算，最终的结果就是只出现一次的元素。

以下是使用 TypeScript 实现的代码：
```typescript
function singleNumber(nums: number[]): number {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}
```

