好的，我们来建立图书 (Book) 和借阅者 (Borrower) 之间的关系。在图书管理系统中，一个常见的关系是：一个借阅者可以借阅多本图书，一本图书可以被多个借阅者借阅（在不同的时间）。这是一种多对多关系。

在 MongoDB 中，处理多对多关系通常有两种方式：

1.  **内嵌文档 (Embedded Documents):** 将一个集合的文档直接嵌入到另一个集合的文档中。这种方式适合数据量较小，且查询时通常需要同时获取两个集合的数据的情况。

2.  **引用 (References):** 在一个集合的文档中存储另一个集合文档的 ID。这种方式更灵活，适合数据量较大或关系比较复杂的情况。

考虑到我们可能需要单独查询借阅者信息，以及图书信息，并且借阅关系可能会比较多，我们选择使用**引用**的方式来实现多对多关系。

**具体实现步骤：**

1.  **修改 `models/book.js`:**

    *   添加一个 `borrowers` 字段，它是一个数组，存储借阅了这本书的借阅者的 ID。

    ```javascript
    // models/book.js
    const mongoose = require('mongoose');

    const bookSchema = new mongoose.Schema({
        title: { type: String, required: true },
        author: { type: String, required: true },
        isbn: { type: String, required: true },
        reviews: [{
            text: { type: String },
            sentiment: { type: String },
        }],
        borrowers: [{
            type: mongoose.Schema.Types.ObjectId, // 存储借阅者 ID
            ref: 'Borrower' // 引用 Borrower 模型
        }]
    });

    module.exports = mongoose.model('Book', bookSchema);
    ```

2.  **修改 `models/borrower.js`:**

    *   添加一个 `books` 字段，它是一个数组，存储该借阅者借阅的图书的 ID。

    ```javascript
    // models/borrower.js
    const mongoose = require('mongoose');

    const borrowerSchema = new mongoose.Schema({
        name: { type: String, required: true },
        borrowerId: { type: String, required: true },
        books: [{
            type: mongoose.Schema.Types.ObjectId, // 存储图书 ID
            ref: 'Book' // 引用 Book 模型
        }]
    });

    module.exports = mongoose.model('Borrower', borrowerSchema);
    ```

3.  **修改 `routes/books.js` 和 `routes/borrowers.js`:**

    *   我们需要添加新的路由来处理借阅和归还图书的操作。
    *   在 `routes/books.js` 中：
        *   添加 `POST /:id/borrow` 路由：借阅一本图书。
        *   添加 `POST /:id/return` 路由：归还一本图书。
    *   在 `routes/borrowers.js` 中：
        *   添加 `POST /:id/borrow` 路由：借阅一本图书（从借阅者角度）。
        *   添加 `POST /:id/return` 路由：归还一本图书（从借阅者角度）。
        *   添加一个获取借阅者借阅书籍的路由.
    *   我们需要修改获取图书列表和借阅者列表的路由，使用 `populate` 方法来获取关联的数据。

```javascript
// routes/books.js
// ... (之前的代码)

// 借阅图书 (从图书角度)
router.post('/:id/borrow', authenticateTokenAndExtractRole, authorizeRole(['admin']), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        const borrower = await Borrower.findById(req.body.borrowerId); // 假设请求体中有 borrowerId

        if (!book || !borrower) {
            return res.status(404).json({ message: '图书或借阅者不存在' });
        }

        // 检查是否已经借阅
        if (book.borrowers.includes(borrower._id)) {
            return res.status(400).json({ message: '该图书已被此借阅者借阅' });
        }

        book.borrowers.push(borrower._id);
        await book.save();

        borrower.books.push(book._id);
        await borrower.save();

        res.json({ message: '借阅成功' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 归还图书 (从图书角度)
router.post('/:id/return', authenticateTokenAndExtractRole, authorizeRole(['admin']), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        const borrower = await Borrower.findById(req.body.borrowerId);

        if (!book || !borrower) {
            return res.status(404).json({ message: '图书或借阅者不存在' });
        }

        // 检查是否已借阅
        if (!book.borrowers.includes(borrower._id)) {
            return res.status(400).json({ message: '该图书未被此借阅者借阅' });
        }

        book.borrowers = book.borrowers.filter(id => id.toString() !== borrower._id.toString());
        await book.save();

        borrower.books = borrower.books.filter(id => id.toString() !== book._id.toString());
        await borrower.save();

        res.json({ message: '归还成功' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 获取所有图书 (包含借阅者信息)
router.get('/', authenticateTokenAndExtractRole, async (req, res) => {
    try {
        const books = await Book.find().populate('borrowers', 'name borrowerId'); // 使用 populate 获取借阅者信息
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 获取指定 ID 的图书 (包含借阅者信息)
router.get('/:id', authenticateTokenAndExtractRole, getBook, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('borrowers', 'name borrowerId'); // 使用 populate
        if (!book) {
          return res.status(404).json({ message: '找不到图书' });
        }
        res.json(book);
      } catch (err) {
          return res.status(500).json({ message: err.message });
      }
});

// ... (其他路由，如添加、更新、删除图书)
```

```javascript
// routes/borrowers.js
const express = require('express');
const router = express.Router();
const Borrower = require('../models/borrower');
const Book = require('../models/book'); // 引入 Book 模型
const jwt = require('jsonwebtoken');

// 验证token的中间件(可以和图书路由复用，这里为了清晰起见再次定义)
function authenticateTokenAndExtractRole(req, res, next) {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

if (token == null) return res.sendStatus(401); // 没有token

jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  if (err) return res.sendStatus(403); // token无效
  req.user = user;
  next();
});
}
// 获取所有借阅者信息 (包含借阅的图书信息)
router.get('/', authenticateTokenAndExtractRole, async (req, res) => {
    try {
        const borrowers = await Borrower.find().populate('books', 'title author isbn'); // 使用 populate 获取图书信息
        res.json(borrowers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 获取指定id的借阅者信息 (包含借阅的图书信息)
router.get('/:id', authenticateTokenAndExtractRole, getBorrower, async(req, res) => {
    try{
        const borrower = await Borrower.findById(req.params.id).populate('books', 'title author isbn');
        if(!borrower){
            return res.status(404).json({message: '找不到借阅者'});
        }
        res.json(borrower);
    } catch(err){
        return res.status(500).json({ message: err.message });
    }
});

// 借阅图书 (从借阅者角度)
router.post('/:id/borrow', authenticateTokenAndExtractRole, authorizeRole(['admin']), async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id);
        const book = await Book.findById(req.body.bookId); // 假设请求体中有 bookId

        if (!borrower || !book) {
            return res.status(404).json({ message: '借阅者或图书不存在' });
        }
    if(borrower.books.includes(book._id)){
        return res.status(400).json({message: '该用户已借阅此书'});
    }
        borrower.books.push(book._id);
        await borrower.save();

        book.borrowers.push(borrower._id);
        await book.save();

        res.json({ message: '借阅成功' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 归还图书 (从借阅者角度)
router.post('/:id/return', authenticateTokenAndExtractRole, authorizeRole(['admin']), async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id);
        const book = await Book.findById(req.body.bookId);

        if (!borrower || !book) {
            return res.status(404).json({ message: '借阅者或图书不存在' });
        }
    if(!borrower.books.includes(book._id)){
      return res.status(400).json({message: '该用户尚未借阅此书'});
    }
        borrower.books = borrower.books.filter(bookId => bookId.toString() !== book._id.toString());
        await borrower.save();

        book.borrowers = book.borrowers.filter(borrowerId => borrowerId.toString() !== borrower._id.toString());
        await book.save();
        res.json({ message: '归还成功' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//获取借阅者借的书籍
router.get('/:id/books', authenticateTokenAndExtractRole, async(req, res) => {
    try{
        const borrower = await Borrower.findById(req.params.id).populate('books');
        if(!borrower){
            return res.status(404).json({message: "找不到借阅者"});
        }
        res.json(borrower.books);
    } catch(err){
        res.status(500).json({message: err.message});
    }
})

// Middleware function to get a single borrower by ID
async function getBorrower(req, res, next) {
    let borrower;
    try {
        borrower = await Borrower.findById(req.params.id);
        if (borrower == null) {
            return res.status(404).json({ message: '找不到借阅者' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.borrower = borrower;
    next();
}

module.exports = router;
```

4.  **修改前端代码 (script.js):**
    因为我们新增了借书和还书的接口, 前端需要添加对应的按钮以及处理函数. 并且, 我们现在返回的图书和借阅者信息包含了彼此, 我们需要修改一下显示逻辑.
    *   添加借阅和归还图书的按钮（仅管理员可见）。
    *   添加借阅和归还图书的函数。
    *   修改 `fetchBooks` 和 `fetchBorrowers` 函数，以处理关联的数据。
    *   在图书列表显示借阅者信息.
    *   在借阅者列表显示图书信息.

```js
// script.js
// ... (之前的代码, 如 getToken, isLoggedIn, getUserRole, requireLogin, logout, setupLogoutButton, login)

// 创建图书数量图表
function createBookChart(bookCount) {
  // ... (保持原样)
}

//创建借阅者数量图表
function createBorrowerChart(borrowerCount){
 // ... (保持原样)
}

// 修改 fetchBooks 函数，在获取数据后调用 createBookChart, 并处理借阅者信息
// 获取图书列表
function fetchBooks() {
  if (!requireLogin()) return; // 检查登录

  fetch('/api/books', {
    headers: {
      'Authorization': 'Bearer ' + getToken() // 添加 token 到请求头
    }
  })
  .then(response => response.json())
  .then(books => {
      // ... (之前的代码, 处理图书列表的展示)
      // 在获取图书数据后，创建图书数量图表
      createBookChart(books.length);

      const bookList = document.getElementById('bookList');
      bookList.innerHTML = ''; // 清空现有列表
      // 获取用户的角色信息
      const userRole = getUserRole();

      books.forEach(book => {
        const row = document.createElement('tr');
        let actionButtons = '';
        let borrowersInfo = '';

        // 显示借阅者信息
        if (book.borrowers && book.borrowers.length > 0) {
            borrowersInfo = '借阅者: ';
            borrowersInfo += book.borrowers.map(b => b.name).join(', '); // 获取借阅者姓名
        }

        //只有管理员显示编辑和删除按钮
        if(userRole === 'admin'){
            actionButtons = `
            <button class="editBtn" data-id="${book._id}">编辑</button>
            <button class="deleteBtn" data-id="${book._id}">删除</button>
            <button class="borrowBtn" data-id="${book._id}">借阅</button>
            <button class="returnBtn" data-id="${book._id}">归还</button>
          `;
        }
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td>${borrowersInfo}</td>
          <td>
            ${actionButtons}
          </td>
        `;
        bookList.appendChild(row);
      });

      // 添加编辑和删除按钮的事件监听器(只有管理员才需要)
      if(userRole === 'admin'){
        addEditAndDeleteListeners();
        addBorrowAndReturnListeners(); // 添加借阅和归还事件
      }
    })
    .catch(error => console.error('获取图书列表失败:', error));
}

//修改fetchBorrowers函数, 添加图书信息
function fetchBorrowers(){
  if(!requireLogin()) return;
  fetch('/api/borrowers', {
      headers: {
          'Authorization': 'Bearer ' + getToken()
      }
  })
  .then(response => response.json())
  .then(borrowers => {
       // 在获取借阅者数据后，创建借阅者数量图表
      createBorrowerChart(borrowers.length);
      const borrowerList = document.getElementById('borrowerList');
      borrowerList.innerHTML = '';
      borrowers.forEach(borrower => {
          const row = document.createElement('tr');
          let booksInfo = '';
           // 显示图书信息
        if(borrower.books && borrower.books.length > 0){
            booksInfo = '借阅图书: ';
            booksInfo += borrower.books.map(b => b.title).join(', '); // 获取图书信息
        }
          row.innerHTML = `
          <td>${borrower._id}</td>
          <td>${borrower.name}</td>
          <td>${borrower.borrowerId}</td>
          <td>${booksInfo}</td>
          `;
          borrowerList.appendChild(row);
      });
  })
  .catch(error => console.error('获取借阅者失败:', error));
}

// 添加图书 (reviews 参数可选)
function addBook(title, author, isbn, reviews = []) {
    // ... (保持原样)
}

//更新图书, 添加reviews
function updateBook(bookId, title, author, isbn, reviews) {
// ... (保持原样)
}

// 删除图书
function deleteBook(bookId) {
// ... (保持原样)
}

// 加载情感分析模型
let sentimentModel; // 用于存储加载的情感分析模型

// 加载情感分析模型
async function loadSentimentModel() {
    // ... (保持原样)
}
//进行情感分析
function analyzeSentiment(text){
// ... (保持原样)
}

// 修改 addEditAndDeleteListeners, 在编辑表单中添加评论输入框
function addEditAndDeleteListeners() {
 // ... (保持原样)
}

//修改showEditForm函数
function showEditForm(bookId) {
    // ... (保持原样)
}

// 借阅图书
function borrowBook(bookId, borrowerId) {
  if (!requireLogin()) return;
    fetch(`/api/books/${bookId}/borrow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      body: JSON.stringify({ borrowerId }) // 发送借阅者 ID
    })
    .then(response => response.json())
    .then(() => {
      fetchBooks(); // 借阅成功后刷新图书列表
    })
    .catch(error => console.error('借阅图书失败:', error));
}
//归还图书
function returnBook(bookId, borrowerId){
    if(!requireLogin()) return;
    fetch(`/api/books/${bookId}/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify({borrowerId})
    })
    .then(response => response.json())
    .then(() => {
        fetchBooks();
    })
    .catch(error => console.error('归还失败:', error));
}
//添加借阅和归还事件
function addBorrowAndReturnListeners(){
    const borrowButtons = document.querySelectorAll('.borrowBtn');
    const returnButtons = document.querySelectorAll('.returnBtn');

    borrowButtons.forEach(button => {
        button.addEventListener('click', () => {
          const bookId = button.dataset.id;
          const borrowerId = prompt("请输入借阅者ID"); // 简单起见，使用 prompt 获取借阅者 ID, 实际中应该使用下拉框
          if(borrowerId){
            borrowBook(bookId, borrowerId);
          }
        })
    })

    returnButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.dataset.id;
            const borrowerId = prompt("请输入借阅者ID");
            if(borrowerId){
                returnBook(bookId, borrowerId);
            }
        })
    })
}

// 在页面加载时执行
document.addEventListener('DOMContentLoaded', () => {
  // ... (之前的代码，如加载模型、登录、事件监听器等)
  // 加载情感分析模型
  loadSentimentModel();

//如果是登录页面
if(window.location.pathname.endsWith('login.html')){
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); //阻止表单默认提交
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    })
} else{ //如果不是登录页面
// 检查登录状态
    if (!isLoggedIn()) {
        window.location.href = 'login.html'; // 如果未登录，重定向到登录页
        return; // 阻止后续代码执行
    }
    // 获取并显示图书列表
    fetchBooks();

    // 设置退出登录按钮
    setupLogoutButton();

    // 添加图书按钮, 只有管理员显示
    const addBookBtn = document.getElementById('addBookBtn');
    if(getUserRole() === 'admin'){
        addBookBtn.style.display = 'block';
        addBookBtn.addEventListener('click', () => {
        // 显示添加图书表单
        document.getElementById('addBookForm').style.display = 'block';
    });
    } else{
        addBookBtn.style.display = 'none';
    }
    // 取消添加图书按钮的事件
    const cancelAddBookBtn = document.getElementById('cancelAddBook');
        if(cancelAddBookBtn){
            cancelAddBookBtn.addEventListener('click', () => {
            document.getElementById('addBookForm').style.display = 'none';
            });
        }
// 添加图书表单提交事件
    const bookForm = document.getElementById('bookForm');
        if (bookForm){ // 检查 bookForm 是否存在
            bookForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const isbn = document.getElementById('isbn').value;
            // 获取评论信息
            const reviewText = document.getElementById('reviewText').value;
            let reviews = [];
            if(reviewText.trim() !== ''){
                const sentiment = analyzeSentiment(reviewText);
                reviews.push({text: reviewText, sentiment: sentiment});
            }
            addBook(title, author, isbn, reviews); //添加图书
            });
        }
    // 如果当前页面是借阅者列表页
    if (window.location.pathname.endsWith('borrowers.html')) {
    fetchBorrowers();
    }

    // 添加情感分析按钮的点击事件
    const analyzeBtn = document.getElementById('analyzeBtn');
    if(analyzeBtn){
        analyzeBtn.addEventListener('click', () => {
        const reviewText = document.getElementById('reviewText').value;
        const sentimentResult = analyzeSentiment(reviewText);
        document.getElementById('sentimentResult').textContent = sentimentResult;
        });
    }
}
});
```

**代码解释 (重点是修改的部分):**

*   **`models/book.js` 和 `models/borrower.js`:**
    *   `borrowers` 和 `books` 字段：
        *   `type: mongoose.Schema.Types.ObjectId`:  存储另一个集合文档的 ID。
        *   `ref: 'Borrower'` 或 `ref: 'Book'`:  指定引用的模型。
*   **`routes/books.js`:**
    *   `POST /:id/borrow`:
        *   根据图书 ID 和借阅者 ID 查找图书和借阅者。
        *   检查图书和借阅者是否存在。
        *   将借阅者 ID 添加到图书的 `borrowers` 数组。
        *   将图书 ID 添加到借阅者的 `books` 数组。
        *   保存更改。
    *   `POST /:id/return`:  归还图书（与借阅类似，但操作相反）。
    *   `router.get('/', ...)` 和 `router.get('/:id', ...)`:
      *   `.populate('borrowers', 'name borrowerId')`: 使用 Mongoose 的 `populate` 方法，在查询图书时，自动获取 `borrowers` 数组中引用的借阅者文档的 `name` 和 `borrowerId` 字段。
* **routes/borrowers.js:**
    *   `POST /:id/borrow`：借书
    *    `POST /:id/return`: 还书
    *   `router.get('/', ...)` 和 `router.get('/:id', ...)`:
      *   `.populate('books', 'title author isbn')`: 获取借阅者借阅的图书信息.

*   **`script.js`:**
    *   `fetchBooks` 和 `fetchBorrowers` 函数：
        *   修改了图书列表和借阅者列表的显示逻辑，以显示关联的数据。
        *   管理员能看到借阅和归还按钮
    *  新增`borrowBook`和`returnBook`函数, 用于借书和还书.
    * 新增`addBorrowAndReturnListeners`, 添加借阅和归还事件.

**测试:**

1.  **启动后端服务:**  `node app.js`
2.  **启动前端 (HTML 文件):**  在浏览器中打开 `index.html` 和 `borrowers.html`。
3.  **登录:**  以管理员身份登录。
4.  **添加一些图书和借阅者数据。**
5.  **测试借阅和归还功能:**
    *   在图书列表页面，点击 "借阅" 按钮，输入借阅者 ID。
    *   在借阅者列表页面和图书列表页面查看借阅关系是否正确建立。
    *   点击 "归还" 按钮，输入借阅者 ID。
    *    查看借阅关系是否已正确解除。
    *   普通用户无法看到借阅和归还按钮.

**改进和注意事项：**

*   **错误处理:**  添加更详细的错误处理，例如，如果借阅者已经借阅了该图书，或者图书已被借出，应给出相应的提示。
*   **输入验证:**  对用户输入的数据（如借阅者 ID）进行验证。
*   **借阅日期和归还日期:**  你可以在借阅关系中添加借阅日期和预计归还日期字段，以实现更完善的借阅管理功能。
*   **借阅数量限制:**  你可以限制一个借阅者同时借阅的图书数量。
* **用户界面**: 为了更好的用户体验, 你可以添加一个借阅者选择的下拉列表, 而不是使用prompt.

通过以上步骤，你已经成功建立了图书和借阅者之间的多对多关系，并实现了基本的借阅和归还功能。
