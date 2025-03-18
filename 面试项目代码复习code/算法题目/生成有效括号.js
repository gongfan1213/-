function generateBFS(n) {
    const result =[] ;
   const queue = [{ str: '', open: 0, close: 0 }];
   while (queue.length > 0) {
       const { str, open, close} = queue.shift();
       if (str.length == 2 *n ) {
           result.push(str);
           continue;
       }
       if (open < n ) {
           queue.push({ str : str + '(', open : open + 1,close });
       }
       if (close < open  ) {
           queue.push({ str : str + ')', open : open ,close: close + 1 });
       }
   }
   return result;
}
console.log(generateBFS(3));
//腾讯3月18日晚上面试题目