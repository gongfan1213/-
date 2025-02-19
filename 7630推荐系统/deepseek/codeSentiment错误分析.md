> 💭 好的，我现在需要解决用户的问题。用户提供的原先代码是从百度AI获取情感分析结果，但结果中的sentiment字段是0到1之间的值，这显然与他们提到的百度情感分析的原始结果不符，原生的百度API返回的sentiment应该是0、1或2，分别代表负面、中性、正面。用户现在希望修改代码，使得baidu_sentiment函数返回的结果符合这个预期，也就是在0、1、2中取值，而不是出现其他数值比如0到1之间的。不过，用户提到的表格中的sentiment字段是0-1之间，这里可能存在混淆，需要进一步澄清。
>
> 首先，我需要检查用户原先的代码到底哪里出了问题。用户的原始代码中，返回的是result.get('items', [{}])[0].get('sentiment', 0)。这里的默认值设置为0（负面）。如果API的response中没有items或者sentiment字段，就会返回0。这可能在实际中导致错误，比如当API返回的items列表为空时，试图访问第一个元素会报错，用户代码使用了[{}]来避免这种情况，但如果有错误发生，比如网络问题，整个result可能不是预期的结构，这样就会出现问题。
>
> 用户现在的结果中出现的是0到1之间的值，而根据百度API文档，sentiment字段应该取0、1、2。这可能意味着用户获得的实际结果中的sentiment字段确实存在其他数值，或者用户在代码中对这些值进行了其他处理。另一种可能性是用户可能在处理数据时，混淆了不同的字段，比如误用了positive_prob字段，该字段是情感为正面的置信度，范围在0到1之间，而sentiment字段是不同的。
>
> 此时，用户可能希望修复代码，确保正确返回0、1或2，而不是其他数值。另外，用户需要处理可能的异常情况，比如API调用失败、无效文本输入等，以避免程序崩溃或返回错误的值。
>
> 现在需要重新编写代码，确保以下几点：
>
> 1. 正确处理API调用中的各种异常，如网络错误、认证错误等。
>
> 2. 当API调用成功但返回结构中缺少必要字段时，处理这种情况，例如返回默认值。
>
> 3. 添加重试机制，以应对可能出现的瞬时错误，比如QPS超限。
>
> 4. 确保返回的sentiment字段是整数0、1或2，否则返回默认的中性（1）以减少对数据分析的影响。
>
> 5. 处理空文本或无效文本输入，如空字符串或全空格的情况，可能返回中性。
>
> 在原始代码中缺少异常处理，如果API调用失败（例如网络问题或权限错误），程序可能会抛出异常导致中断。同时，未处理返回数据结构不符合预期的情况，比如items列表为空或缺少sentiment字段，这将导致KeyError或IndexError。
>
> 重写的代码需要包括以下改进：
>
> - 使用try-except块来捕获异常。
>
> - 添加重试机制，特别是对QPS超限错误（错误码18）。
>
> - 检查返回的items是否有效，并正确提取sentiment字段。
>
> - 设置合理的默认值，当无法确定情感时返回中性（1）。
>
> - 预处理输入文本，例如去除前后空格，当文本为空时返回中性。
>
> 结合用户提供的API信息，现在要考虑如何构建一个健壮的情感分析函数。
>
> 可能的步骤如下：
>
> 1. 预处理输入文本，如果为空或无效，返回1。
>
> 2. 设置重试次数，比如3次，特别是处理错误码18（QPS超限）时，延迟后重试。
>
> 3. 在每次API调用后检查结果结构，是否存在items且不为空，并sentiment是否存在。
>
> 4. 处理错误码，如果错误码是需要重试的（如18），则进行重试，否则返回默认值。
>
> 5. 添加异常处理，如网络错误、超时等，返回默认值。
>
> 现在，百度AI的sentimentClassify方法可能返回的错误码有很多，需要特别处理常见的错误，如QPS超限、无效参数、认证失败等。例如，错误码18需要重试，而其他错误码可能需要不同的处理方式。
>
> 此外，需要添加适当的等待时间在重试之间，例如使用指数退避策略。
>
> 特别是在处理QPS超限时，错误码18，建议的解决方案是等待一段时间后重试。因此，可以在函数中添加一个retry参数，表示最大重试次数，每次重试之前等待一段时间，例如等待(2^retry_attempt)秒。
>
> 修改后的代码可能包括：
>
> - 函数参数增加max_retries，默认为3。
>
> - 在循环中进行重试，每次遇到错误码18时减少重试次数并等待。
>
> - 处理其他错误时直接返回中性。
>
> 同时，为了确保输入文本有效，预处理步骤应该去除空格，检查长度是否为0，如果是的话返回中性。
>
> 最后，将所有可能的错误情况处理，确保返回的值为0、1或2，并在任何异常情况下返回1（中性）作为安全默认值，以避免对后续分析造成偏差。
>
> 这样编写出的代码应该更健壮，符合用户的需求，即返回正确的sentiment值，避免之前的错误结果（如0到1之间）。
>
> 



我理解了您的需求，现在为您提供优化后的标准化实现方案：

```python
from aip import AipNlp
import time
import logging

# 百度AI配置
APP_ID = '117454407'
API_KEY = '1mHjXFU3xWMrAqq50rRie126'
SECRET_KEY = 'QllQxfmLegMOqdMNX4fec62Q2oAKo10r'
client = AipNlp(APP_ID, API_KEY, SECRET_KEY)

# 配置日志记录
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler('sentiment_analysis.log'), logging.StreamHandler()]
)

def preprocess_text(text: str) -> str:
    """文本预处理"""
    cleaned = text.strip()[:1024]  # 截断前1024字节保持API兼容性
    return cleaned if len(cleaned) >= 4 else ""  # 过滤过短文本

def get_sentiment(text: str, max_retries: int = 3) -> int:
    """
    百度情感分析增强版
    
    参数：
        text: 需要分析的文本
        max_retries: 最大重试次数（包含QPS超限自动重试）
        
    返回：
        0 - 负面
        1 - 中性
        2 - 正面
    """
    processed_text = preprocess_text(text)
    
    # 空文本直接返回中性
    if not processed_text:
        logging.warning(f"收到空文本输入: {text[:20]}...")
        return 1
    
    for attempt in range(max_retries):
        try:
            result = client.sentimentClassify(processed_text)
            
            # 错误码处理优先级最高
            if 'error_code' in result:
                error_code = result['error_code']
                
                # QPS超限处理（误差码18）
                if error_code == 18 and attempt < max_retries - 1:
                    wait_time = 2 ** attempt  # 指数退避策略
                    logging.warning(f"QPS超限，第{attempt+1}次重试等待{wait_time}秒")
                    time.sleep(wait_time)
                    continue
                
                # 其他错误码处理
                logging.error(f"业务错误码：{error_code}, 消息：{result.get('error_msg')}")
                return 1  # 降级返回中性
            
            # 数据结构解析
            items = result.get('items', [])
            if not items:
                logging.warning("响应中未找到有效items字段")
                return 1
                
            main_item = items[0]
            sentiment = main_item.get('sentiment', 1)  # 默认中性
            
            # 验证数值有效性
            if sentiment not in (0, 1, 2):
                logging.error(f"非法情感值：{sentiment}")
                return 1
                
            return sentiment
            
        except Exception as e:
            logging.error(f"服务端异常：{str(e)}", exc_info=True)
            if attempt == max_retries - 1:
                return 1
            time.sleep(1)
    
    return 1  # 冗余安全返回

# 示例：批量处理DataFrame
try:
    cleaned_df['baidu_sentiment'] = cleaned_df['title'].apply(get_sentiment)
    cleaned_df.to_csv('sentiment_results.csv', index=False)
except Exception as e:
    logging.critical("主处理流程异常：" + str(e))
    raise
```

**主要改进说明：**

1. **多级输入过滤机制**：
   - 自动去除头尾空白字符
   - 限制输入长度（1024字符符合API限制）
   - 过滤最小值长度（<4字符的文本视为无效）

2. **智能重试策略**：
   - 特别处理QPS超限（错误码18）
   - 指数退避等待策略（1->2->4秒）
   - 最大重试次数可配置

3. **分层错误处理**：
```python
错误处理层级：
├─ 输入验证层（返回中性）
├─ 业务错误码层（特殊错误自动恢复）
├─ 结构验证层（字段存在性检测）
├─ 数值验证层（值域校验）
└─ 全局异常捕获（透过异常管理系统）
```

4. **防御性编程增强**：
   - 所有字典访问使用.get()安全方法
   - 多层验证返回值有效性
   - 强制类型安全保护

5. **日志追踪增强**：
   - 包含ERROR/WARNING级别日志
   - 记录完整的错误堆栈信息
   - 输出到文件与控制台双路

**典型错误场景处理示例**：

| 场景描述                  | 处理策略                     | 返回结果 |
|--------------------------|----------------------------|----------|
| 文本内容为空白            | 预处理阶段拦截              | 1 (中性) |
| API响应无items字段        | 结构验证拦截                | 1        |
| sentiment字段值为3        | 数值验证拦截                | 1        |
| 网络超时（持续3秒）        | 异常捕获+重试机制           | 1        |
| QPS超限（错误码18）        | 指数退避自动重试            | 自动恢复 |

建议在生产环境中补充以下监控措施：
1. 实时监控错误率（>5%触发告警）
2. 统计中性结果的占比（识别系统降级频率）
3. QPS用量趋势分析（预防限流）
