在之前的代码中，我已经提到并部分实现了数据可视化的后端支持，但没有完整地展示如何在前端和后端结合实现数据可视化功能。为了确保作业的所有要求都被完整实现，以下是完整的 **数据可视化** 实现方案，包括后端 API 和前端展示。

---

### **数据可视化的目标**
我们希望通过数据可视化展示用户书籍的统计信息，例如：
1. **书籍阅读状态分布：** 展示用户的书籍在不同阅读状态（未开始、正在阅读、已完成）下的数量。
2. **书籍评分分布：** 展示用户书籍的评分分布（例如 1-5 星的数量）。

---

### **后端实现：数据统计 API**

在 `routes/bookRoutes.js` 中添加一个新的路由，用于生成书籍统计数据。

#### **(1) 阅读状态分布统计**
```javascript
// 获取书籍阅读状态分布
router.get("/stats/status", authenticateToken, async (req, res) => {
  try {
    const stats = await Book.aggregate([
      { $match: { userId: req.user.id } }, // 仅统计当前用户的书籍
      { $group: { _id: "$status", count: { $sum: 1 } } }, // 按状态分组并统计数量
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching status stats", error });
  }
});
```

#### **(2) 评分分布统计**
```javascript
// 获取书籍评分分布
router.get("/stats/rating", authenticateToken, async (req, res) => {
  try {
    const stats = await Book.aggregate([
      { $match: { userId: req.user.id } }, // 仅统计当前用户的书籍
      {
        $bucket: {
          groupBy: "$rating", // 按评分分组
          boundaries: [0, 1, 2, 3, 4, 5], // 定义评分区间
          default: "Other",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rating stats", error });
  }
});
```

---

### **前端实现：数据可视化组件**

在前端，我们使用 **Chart.js** 来展示统计数据。以下是完整的实现步骤。

#### **(1) 安装 Chart.js**
在前端项目中安装 Chart.js：
```bash
npm install chart.js react-chartjs-2
```

#### **(2) 创建数据可视化组件**
创建 `src/components/Books/BookStats.js`：

```javascript
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { fetchStatusStats, fetchRatingStats } from "../../services/api";

function BookStats() {
  const [statusData, setStatusData] = useState(null);
  const [ratingData, setRatingData] = useState(null);

  useEffect(() => {
    // 获取阅读状态分布数据
    const getStatusStats = async () => {
      const { data } = await fetchStatusStats();
      const labels = data.map((item) => item._id); // 状态名称
      const counts = data.map((item) => item.count); // 数量
      setStatusData({
        labels,
        datasets: [
          {
            label: "Books by Status",
            data: counts,
            backgroundColor: ["#f39c12", "#3498db", "#2ecc71"],
          },
        ],
      });
    };

    // 获取评分分布数据
    const getRatingStats = async () => {
      const { data } = await fetchRatingStats();
      const labels = data.map((item) => `Rating: ${item._id}`); // 评分区间
      const counts = data.map((item) => item.count); // 数量
      setRatingData({
        labels,
        datasets: [
          {
            label: "Books by Rating",
            data: counts,
            backgroundColor: ["#e74c3c", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6"],
          },
        ],
      });
    };

    getStatusStats();
    getRatingStats();
  }, []);

  return (
    <div>
      <h2>Book Statistics</h2>
      {statusData && (
        <div>
          <h3>Books by Reading Status</h3>
          <Pie data={statusData} />
        </div>
      )}
      {ratingData && (
        <div>
          <h3>Books by Rating</h3>
          <Bar data={ratingData} />
        </div>
      )}
    </div>
  );
}

export default BookStats;
```

#### **(3) 添加 API 服务**
在 `src/services/api.js` 中添加新的 API 调用：

```javascript
export const fetchStatusStats = () => API.get("/books/stats/status");
export const fetchRatingStats = () => API.get("/books/stats/rating");
```

#### **(4) 在前端路由中添加数据可视化页面**
在 `src/App.js` 中添加路由：

```javascript
import BookStats from "./components/Books/BookStats";

<Routes>
  {/* 其他路由 */}
  <Route path="/stats" element={<BookStats />} />
</Routes>
```

#### **(5) 添加导航链接**
在 `src/components/Navbar.js` 中添加导航链接：

```javascript
<Link to="/stats">Statistics</Link>
```

---

### **运行效果**
1. **阅读状态分布：**
   - 使用饼图（Pie Chart）展示用户书籍在不同阅读状态下的数量。
   - 示例：
     - 未开始：5 本
     - 正在阅读：3 本
     - 已完成：7 本

2. **评分分布：**
   - 使用柱状图（Bar Chart）展示用户书籍的评分分布。
   - 示例：
     - 1 星：2 本
     - 2 星：3 本
     - 3 星：5 本
     - 4 星：8 本
     - 5 星：10 本

---

### **完整性检查**
以下是数据可视化功能的完整性检查：

| **功能**                          | **状态**       |
|-----------------------------------|----------------|
| 后端 API（阅读状态分布）           | ✅ 已实现       |
| 后端 API（评分分布）               | ✅ 已实现       |
| 前端数据获取                      | ✅ 已实现       |
| 前端图表展示（饼图 + 柱状图）      | ✅ 已实现       |
| 路由和导航                        | ✅ 已实现       |

---

### **总结**
通过以上实现，数据可视化功能已经完整实现，满足作业的要求。用户可以通过图表直观地查看书籍的阅读状态分布和评分分布。这不仅提升了项目的功能性，还为用户提供了更好的体验。

如果你还有其他问题，或者需要进一步的指导，请随时提问！
