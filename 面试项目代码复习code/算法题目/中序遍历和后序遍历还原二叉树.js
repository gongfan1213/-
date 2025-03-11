function buildTree(inorder, postorder) {
    if (inorder.length === 0) return null;

    // 后序遍历的最后一个元素是根节点
    const rootVal = postorder.pop();
    const root = new TreeNode(rootVal);

    // 在中序遍历中找到根节点的位置
    const mid = inorder.indexOf(rootVal);

    // 递归构建右子树和左子树
    root.right = buildTree(inorder.slice(mid + 1), postorder);
    root.left = buildTree(inorder.slice(0, mid), postorder);

    return root;
}

// 树节点定义
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}