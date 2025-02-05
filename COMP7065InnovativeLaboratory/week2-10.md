以下是完整的 Task-2 实现代码，适用于 Google Colab。代码包括面部表情识别 (FER) 模型、面部关键点检测模型、特效添加逻辑以及测试样例的展示。

---

### **完整代码**

```python
# Step 1: Import necessary libraries
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision.models import resnet18
from torchvision.models import mobilenet_v2
from PIL import Image, ImageDraw
import matplotlib.pyplot as plt
import numpy as np
import os

# Step 2: Define the Facial Expression Recognition (FER) Model
class FERModel(nn.Module):
    def __init__(self, num_classes=7):
        super(FERModel, self).__init__()
        self.base_model = resnet18(pretrained=True)
        self.base_model.fc = nn.Linear(self.base_model.fc.in_features, num_classes)

    def forward(self, x):
        return self.base_model(x)

# Load the FER model
fer_model = FERModel(num_classes=7)
fer_model.load_state_dict(torch.load("fer_resnet18.pth", map_location=torch.device('cpu')))
fer_model.eval()

# Step 3: Load the Facial Landmark Detection Model
# Load the trained MobileNetV2 model from Task-1
landmark_model = mobilenet_v2(pretrained=True)
landmark_model.classifier[1] = nn.Linear(1280, 196)  # 98 keypoints (x, y)
landmark_model.load_state_dict(torch.load("landmark_model_weights.pth", map_location=torch.device('cpu')))
landmark_model.eval()

# Step 4: Define Accessories and Their Positions
# Load accessory images
accessories = {
    'happy': Image.open("star.png").convert("RGBA"),  # Star accessory for happiness
    'sad': Image.open("tear.png").convert("RGBA"),   # Tear accessory for sadness
    'anger': Image.open("fire.png").convert("RGBA")  # Fire accessory for anger
}

# Define positions for accessories based on landmarks
def get_accessory_positions(emotion, landmarks):
    if emotion == 'happy':
        # Place stars above the eyes
        left_eye = landmarks[36]  # Left eye center
        right_eye = landmarks[45]  # Right eye center
        return [(left_eye[0] - 20, left_eye[1] - 40), (right_eye[0] - 20, right_eye[1] - 40)]
    elif emotion == 'sad':
        # Place tears below the eyes
        left_eye = landmarks[36]
        right_eye = landmarks[45]
        return [(left_eye[0], left_eye[1] + 20), (right_eye[0], right_eye[1] + 20)]
    elif emotion == 'anger':
        # Place fire above the eyebrows
        left_eyebrow = landmarks[21]
        right_eyebrow = landmarks[22]
        return [(left_eyebrow[0] - 10, left_eyebrow[1] - 30), (right_eyebrow[0] - 10, right_eyebrow[1] - 30)]
    return []

# Step 5: Define the Face Filter Function
def facefilter(image_path):
    # Load the input image
    image = Image.open(image_path).convert("RGB")
    image_tensor = transforms.ToTensor()(image).unsqueeze(0)

    # Step 1: Use FER model to predict emotion
    with torch.no_grad():
        emotion_probs = fer_model(image_tensor)
        emotion_idx = torch.argmax(emotion_probs, dim=1).item()
        emotions = ['neutral', 'happy', 'sad', 'anger', 'surprise', 'fear', 'disgust']
        emotion = emotions[emotion_idx]

    # Step 2: Use landmark model to detect facial landmarks
    with torch.no_grad():
        landmarks = landmark_model(image_tensor).view(-1, 2).numpy()

    # Step 3: Add accessories based on emotion
    if emotion in accessories:
        positions = get_accessory_positions(emotion, landmarks)
        accessory = accessories[emotion]

        # Add accessories to the image
        for pos in positions:
            accessory_resized = accessory.resize((40, 40))  # Resize accessory
            image.paste(accessory_resized, (int(pos[0]), int(pos[1])), accessory_resized)

    return image, emotion

# Step 6: Test the Face Filter Function
# Test samples from the WFLW dataset
test_samples = [
    "./WFLW/WFLW_images/0--Parade/0_Parade_marchingband_1_116.jpg",
    "./WFLW/WFLW_images/1--Handshaking/1_Handshaking_Handshaking_1_2.jpg",
    "./WFLW/WFLW_images/10--People_Marching/10_People_Marching_Marching_10_1.jpg"
]

# Process each test sample
for sample in test_samples:
    output_image, detected_emotion = facefilter(sample)
    print(f"Detected Emotion: {detected_emotion}")
    plt.figure()
    plt.imshow(output_image)
    plt.axis('off')
    plt.show()

# Step 7: Save Results
output_dir = "./output_results"
os.makedirs(output_dir, exist_ok=True)

for i, sample in enumerate(test_samples):
    output_image, detected_emotion = facefilter(sample)
    output_path = os.path.join(output_dir, f"result_{i+1}_{detected_emotion}.png")
    output_image.save(output_path)
    print(f"Result saved to {output_path}")
```

---

### **代码说明**

1. **FER 模型**:
   - 使用 ResNet18 作为基础模型。
   - 预测七种情绪：`['neutral', 'happy', 'sad', 'anger', 'surprise', 'fear', 'disgust']`。

2. **面部关键点检测**:
   - 使用 Task-1 中训练的 MobileNetV2 模型检测 98 个面部关键点。

3. **特效添加**:
   - 根据情绪选择特效（如星星、眼泪、火焰）。
   - 使用关键点确定特效的位置（如眼睛上方、眼睛下方、眉毛上方）。

4. **测试和保存结果**:
   - 从 WFLW 数据集中选择测试样例。
   - 显示并保存处理后的图片。

---

### **运行步骤**

1. **准备文件**:
   - 确保以下文件存在：
     - `fer_resnet18.pth`: FER 模型的权重文件。
     - `landmark_model_weights.pth`: 面部关键点检测模型的权重文件。
     - 特效图片：`star.png`、`tear.png`、`fire.png`。

2. **上传到 Colab**:
   - 将上述文件上传到 Colab 的工作目录。

3. **运行代码**:
   - 按顺序运行代码单元格。
   - 结果将显示在输出中，并保存到 `./output_results` 目录。

---

### **输出**
- **输入**: 测试图片。
- **输出**: 带有特效的图片（根据检测到的情绪添加特效）。

---

### **注意事项**
- 确保所有依赖项（如 `torch`, `PIL`, `matplotlib`）已安装。
- 如果需要调整特效位置或大小，可以修改 `get_accessory_positions` 函数。

如果有任何问题，请随时告诉我！
