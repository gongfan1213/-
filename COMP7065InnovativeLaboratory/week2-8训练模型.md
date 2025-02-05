### **通俗易懂的解释和完整代码**

我们现在进入实验的最后阶段：**训练模型、测试模型、评估模型性能，并可视化结果**。以下是每一步的详细解释和代码。

---

### **1. 训练模型 (Training Loop)**

#### **训练过程**
1. **加载数据**：从 `train_dataloader` 中获取一批数据（图片和关键点）。
2. **前向传播**：将图片输入模型，得到预测的关键点。
3. **计算损失**：比较预测的关键点和真实的关键点，计算误差（损失）。
4. **反向传播**：根据损失调整模型的参数。
5. **更新参数**：使用优化器更新模型的权重。

#### **代码**
以下是训练代码：

```python
from tqdm import tqdm

# 将模型移动到设备（CPU 或 GPU）
model.to(device)
model.train()  # 设置模型为训练模式

# 训练 3 个 epoch
for epoch in range(3):
    running_loss = 0.0
    bar = tqdm(enumerate(train_dataloader), total=len(train_dataloader))  # 进度条
    for i, data in bar:
        inputs, labels = data['image'], data['landmarks']
        
        # 清空梯度
        optimizer.zero_grad()
        
        # 前向传播
        outputs = model(inputs)
        
        # 计算损失
        loss = criterion(outputs.reshape(batch_size, 5, 2), labels)
        loss.to(device)
        
        # 反向传播
        loss.backward()
        
        # 更新参数
        optimizer.step()

        # 累加损失
        running_loss += loss.item()
        bar.set_postfix(epoch=f'[{epoch + 1}, {i + 1}]', loss=running_loss / (i + 1))
```

#### **代码解释**
- `model.train()`：将模型设置为训练模式。
- `optimizer.zero_grad()`：清空之前的梯度。
- `loss.backward()`：计算梯度。
- `optimizer.step()`：更新模型参数。
- `tqdm`：显示训练进度条。

---

### **2. 测试模型 (Testing Loop)**

#### **测试过程**
1. **加载测试数据**：从 `test_dataloader` 中获取一批数据。
2. **前向传播**：将图片输入模型，得到预测的关键点。
3. **计算损失**：比较预测的关键点和真实的关键点，计算误差。

#### **代码**
以下是测试代码：

```python
model.eval()  # 设置模型为评估模式

running_loss = 0.0

with torch.no_grad():  # 禁用梯度计算（测试时不需要反向传播）
    bar = tqdm(enumerate(test_dataloader), total=len(test_dataloader))  # 进度条
    for i, data in bar:
        inputs, labels = data['image'], data['landmarks']
        
        # 前向传播
        outputs = model(inputs)
        
        # 计算损失
        loss = criterion(outputs.reshape(batch_size, 5, 2), labels)
        running_loss += loss.item()
        
        # 更新进度条
        bar.set_postfix(batch=i, loss=running_loss / (i + 1), running_loss=running_loss)
```

#### **代码解释**
- `model.eval()`：将模型设置为评估模式。
- `torch.no_grad()`：禁用梯度计算，节省内存和计算资源。
- `running_loss`：累加测试集的损失。

---

### **3. 评估模型性能**

#### **评估方法**
我们使用 **欧几里得距离 (Euclidean Distance)** 来评估模型预测的关键点与真实关键点之间的误差。

#### **代码**
以下是计算欧几里得距离的函数：

```python
def euclidean_dist(vector_x, vector_y):
    vector_x, vector_y = np.array(vector_x), np.array(vector_y)

    # 计算每个关键点的欧几里得距离
    distance = np.sqrt(np.sum((vector_x - vector_y)**2, axis=-1))
    
    # 计算归一化距离（用两个眼睛之间的距离归一化）
    distance_y = np.sqrt(np.sum((vector_y[0] - vector_y[1])**2))
    normalized_distance = distance / distance_y
    
    return distance, normalized_distance
```

#### **代码解释**
- `np.sqrt(np.sum((vector_x - vector_y)**2, axis=-1))`：计算每个关键点的欧几里得距离。
- `distance_y`：用两个眼睛之间的距离归一化误差。

---

### **4. 可视化结果**

#### **可视化过程**
1. **加载测试数据**：从 `test_dataset` 中获取样本。
2. **预测关键点**：将图片输入模型，得到预测的关键点。
3. **绘制图片**：显示图片，并用绿色点标注真实关键点，用红色点标注预测关键点。

#### **代码**
以下是可视化代码：

```python
import matplotlib.pyplot as plt
import numpy as np

model.eval()  # 设置模型为评估模式
fig = plt.figure(figsize=(12, 12))

num_images = 12  # 可视化 12 张图片

for i in range(num_images):
    sample = test_dataset[i]
    inputs, labels = sample['image'], sample['landmarks']

    # 预测关键点
    outputs = model(inputs.unsqueeze(0))  # 添加 batch 维度
    outputs = (outputs.reshape(5, 2).cpu().detach().numpy() * 224).astype(int)
    landmarks = (labels.cpu().detach().numpy() * 224).astype(int)
    image = (inputs.cpu().permute(1, 2, 0).numpy() * 255).astype(int)

    # 绘制图片
    ax = plt.subplot(3, 4, i + 1)
    plt.tight_layout()
    distance, normalized_distance = euclidean_dist(outputs, landmarks)
    ax.set_title('Sample #{} distance {:.2f} \n normalized_distance {:.2f}'.format(i, np.sum(distance), np.sum(normalized_distance)))
    ax.axis('off')

    plt.imshow(image)
    plt.scatter(landmarks[:, 0], landmarks[:, 1], s=50, marker='.', c='g')  # 真实关键点（绿色）
    plt.scatter(outputs[:, 0], outputs[:, 1], s=50, marker='.', c='r')  # 预测关键点（红色）

plt.show()
```

#### **代码解释**
- `inputs.unsqueeze(0)`：为单张图片添加 batch 维度。
- `outputs.reshape(5, 2)`：将模型输出的 10 个值重塑为 5 个关键点的 (x, y) 坐标。
- `plt.scatter()`：绘制关键点，绿色为真实值，红色为预测值。

---

### **总结**
1. **训练模型**：通过训练循环微调预训练的 MobileNetV2。
2. **测试模型**：在测试集上评估模型性能。
3. **评估误差**：使用欧几里得距离计算预测值和真实值之间的误差。
4. **可视化结果**：绘制图片，显示真实关键点和预测关键点。

如果你有任何问题，或者需要进一步优化代码，请随时告诉我！
