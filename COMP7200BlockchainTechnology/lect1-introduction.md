# 区块链技术与应用讲座1：区块链入门
讲师：戴宏宁博士（亨利）
课程编号：COMP4137 / COMP7200

## 目录
- 加密货币
- 区块链
- 区块链应用

### 加密货币
- **比特币：一种点对点的电子现金系统**
    - 作者：中本聪（Satoshi Nakamoto），邮箱：satoshin@gnx.com ，官网：www.bitcoin.org
- **以太坊**
    - 作者：维塔利克·布特林（Vitalik Buterin），个人主页：https://vitalik.ca/index.html
- **摘要**：一种纯粹的点对点电子现金系统将允许在线交易直接在双方之间进行，而无需通过受信任的第三方。网络通过将交易哈希处理到一个持续的基于哈希的工作量证明链中，为交易加上时间戳，形成一个记录，若不重新进行工作量证明则无法更改。最长的链不仅是交易顺序的证明，而且如果攻击者想要攻击网络，他们需要生成最长的链以超过诚实节点。该网络本身所需的结构非常简单。消息以尽力而为的方式广播，节点可以随意离开和重新加入网络，并将最长的工作量证明链作为其离开期间发生事情的证明。

### 加密货币
- **比特币历史价格**：[价格走势图，来源：https://www.statista.com/statistics/326707/bitcoin-price-index/ ]
- **当前加密货币数量**：目前有超过2000种加密货币。
- **加密货币的不同特点**
| 比较项目 | 比特币（BTC） | 零币（ZEC） |
| --- | --- | --- |
| 系统 | 同源差异：零币代码基于比特币0.11.2版本代码修改 |
| 概念 | 数字货币 | 隐私数字货币 |
| 交易详情 | 公开可见 | 隐藏（需用密钥读取） |
| 交易示例 | 地址X向地址Y发送1个比特币 | ？向？发送？个零币 |
| 市值 | 约8000亿美元 | 约20亿美元 |
| 发布日期 | 2009年1月 | 2016年10月 |
| 发布方式 | 挖矿 | 挖矿/创始人奖励 |
| 挖矿算法 | SHA256 | Equihash |
| 支持平台 | 基于网页的钱包 | 零币：仅支持Linux系统，无图形界面的命令行操作 |
| 总量 | 2100万 | 2100万 |
| 出块时间 | 10分钟 | 2.5分钟 |
| 区块大小 | 1MB | 2MB |

### 加密货币
- **优点**
    - 快速、安全且成本低
    - 使用便捷、高度便携
    - 匿名性
    - 去中心化
    - 用户积极参与
    - 透明且中立
- **缺点**
    - 一旦丢失无法找回
    - 市场波动大
    - 存在恶意活动（洗钱、诈骗）
- **挑战**
    - 缺乏可审计性
    - 复杂的数学计算
    - 数据隐私问题
    - 性能问题（高延迟、低吞吐量）
    - 不同区块链之间的通信问题
- **加密货币数据分析**：如果与其他非匿名地址进行过交易，像Chainalysis、Elliptic这样的软件可以推断出你的地址。

### 非同质化代币（NFT）
- NFT是存储在区块链上的一个数据单元，用于表示对某个对象（一种虚拟资产）的所有权。
- 每个NFT都代表着独一无二、不可互换且不可分割的事物。它可以是照片、视频、音频及其他类型的数字文件。
- **平台和标准**：以太坊、ERC - 721、ERC - 1155、FLOW、Tezos、Solana
- **相关社区：项目和品牌**：CryptoKitties、CNBA、SSHOT、UFC、SERA、SNFLPA、animeca、UBISOFT、SAMSUNG、BINANCE GENIES、OpenSea、YONSEI、Berkeley、bitkub、RIT、PURDUE、Fement OO、BisonTrailis、B - SIDE GAMES、BLOCKPARTY
- NFT是存储在区块链上的独特且不可互换的资产（数据）。
- **可替代性**：指一种资产能够与相同价值的类似资产进行交换或替代的能力。可替代的资产如法定货币，而NFT缺乏这种可互换性（可替代性），这使其有别于区块链加密货币。例如NBA Top shot中的NFT数字藏品。

### 区块链 - 高层次概述
- 加密货币≠区块链
- 区块链是一种数据结构。它由一系列连续连接的区块组成。每个区块通过一个反向引用（本质上是父区块的哈希值）指向其前一个区块（称为父区块）。[此处有区块链结构示意图，包含创世块、Merkle树结构等]
- **比特币创世块**：[比特币创世块的原始十六进制数据及相关信息，包含版本、哈希值、时间戳等，以及对应的文本信息 “The Times 03/Jan/2009 Chancellor on brink of second bailout for banks”，链接：https://btc.com/4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b]
- 区块链系统是一个去中心化系统。构建一个区块链系统需要多种信息通信技术（ICT），包括：
    - 加密算法
    - 计算机网络
    - 分布式系统与共识机制
    - 智能合约（软件技术）
    - 奖励与交易成本（经济学）

### 区块链工作流程
以一笔单一交易为例：
1. 交易发起。
2. 节点将交易广播到对等网络（P2P网络）。
3. 验证后的交易被收集形成一个区块。
4. 新生成的区块会添加到区块链中，该区块包含前一个区块的哈希值、时间戳、随机数（Nonce）以及交易的Merkle根等信息。[此处有交易流程示意图]

### 区块链交易
- 区块链交易是区块链中最小的元素。
- 它记录了每一个决策和采取的行动，是历史的证明，提供了事物的起源信息。[此处有一个区块链交易的示例，包含交易摘要、金额、手续费等信息，以及产品溯源的相关信息，如生产、运输、销售的时间和地点等]

### 区块链 “区块”
- 一个区块包含多个交易。
- 交易具有不可变、不可擦除的特性，一旦区块被添加到链中，就极难更改。若要修改，需要对后续所有区块重新进行处理，并获得每个区块的共识。[此处有包含多个交易的区块示意图]

### 区块链
- 区块链由多个区块组成。
- 区块之间通过密码学技术链接。
- 区块链是分布式账本的一个实例。[此处有区块链浏览器中交易查询的界面示例图]

### 分布式网络
- 区块链在去中心化/分布式的P2P网络上运行。
- 每个节点都存储着账本的一个副本。[此处有集中式网络、分布式网络、去中心化网络的对比示意图，展示了节点之间的交互方式差异]
- 区块链是一种分布式账本。集中式账本由一个中心节点存储，而分布式账本存储在每一个节点中。所有节点通过一种共识协议就账本的真实状态达成一致。[此处有集中式账本和分布式账本的对比示例图，展示了不同账本记录交易的方式]
- 分布式账本记录了网络中进行的所有交易。它可以进行加密以保证机密性，个人无需中央机构即可使用。账本记录极难被更改，因为更改账本中的一条记录需要所有参与者达成共识，并且需要对后续所有记录重新进行处理。

### 区块链演示
演示链接：https://andersbrownworth.com/blockchain/

### 分布式共识
- 分布式共识用于确保区块链中的区块是有效且真实的。
- 防止恶意攻击者破坏系统或造成链分叉。
- 存在多种共识协议，各有优缺点，如工作量证明（PoW）、权益证明（PoS）、消逝时间证明（PoET）、活动证明（PoA）、燃烧证明（PoB），以及Paxos、拜占庭容错（BFT）、Streamlet等。后续我们将深入探讨许多区块链共识协议。

### 智能合约
- 智能合约是运行在安全环境中的程序，它在特定条件下控制数字资产在各方之间的转移。
- 合约被编码到区块链中，使得区块链应用不仅仅局限于加密货币领域。
- 示例代码（使用Solidity语言）：
```solidity
pragma solidity 0.5.8;
contract SimpleBank {
    mapping(address => uint) balances;
    function deposit(uint amount) payable public { 
        balances[msg.sender] += amount;
    }
    function withdraw() public { 
        msg.sender.transfer(balances[msg.sender]);
        balances[msg.sender] = 0;
    }
}
```
- 智能合约是一种计算机程序，它：
    - 定义规则
    - 执行条款要求的行动
    - 自主运行，无所有者
    - 具有安全性
- 智能合约使用高级编程语言编写（例如Solidity）。不同区块链技术对智能合约的支持情况和使用的语言有所不同：
| 区块链技术 | 是否支持智能合约 | 使用语言 |
| --- | --- | --- |
| 比特币 | 否 | C++ |
| 以太坊 | 是 | Solidity |
| 超级账本 | 是 | GoLang、C++等 |
- **智能合约在业务流程中的应用示例**：包含供应商、买家、承运商之间的产品采购、交付、运输、接收以及支付等业务流程的示例图。
- **智能合约的优点**
    - 降低风险。由于区块链数据的不可变性、可追溯性和可审计性。
    - 削减管理和服务成本。区块链无需通过中央经纪人或中介机构就能确保信任。智能合约可以以去中心化的方式自动触发。
    - 提高业务流程效率。消除对中介的依赖可以显著提升业务流程的效率。
- 区块链使能智能合约。本质上，智能合约是在区块链之上实现的。智能合约的生命周期包括创建、部署、执行、完成，涉及协商、资产冻结、评估、自动执行、状态更新、资产解冻等环节，这些操作都与区块链进行交互。[此处有智能合约生命周期与区块链交互的示意图]

### 区块链发展历程
- **区块链1.0**：以比特币为代表，主要实现可编程货币。
- **区块链2.0**：以以太坊为代表，引入智能合约。
- **区块链3.0**：致力于解决当前区块链行业存在的问题，如可扩展性、互操作性、隐私保护等。

### 区块链应用
- **区块链在关键行业的应用**
    - **银行和投资领域**：香港金融管理局、智易联动（elradeConnect）等利用区块链改善已有数十年历史的运营和流程。
    - **游戏和艺术品领域**：通过代币进行虚拟商品交易。
    - **零售领域**：用于产品追踪溯源、防伪、库存管理和审计。
- **食品行业的区块链网络**：区块链可用于食品行业，实现食品供应链的可追溯性。食品供应链各环节的信息，如供应商、生产商、零售商等信息都会存储在区块链中。[此处有食品行业区块链网络的信息流和物流示意图]
- **医疗记录中的区块链应用**：当你进入一家非你常去的医疗机构时，提供通过区块链验证的身份信息，你的 “私钥” 可以解锁与你健康记录相关的加密数据，为医疗数据提供更强的隐私保护。因为每个患者的记录都有自己独立的密钥，而不是像传统医疗数据库那样用一个密钥加密（该密钥可能丢失或被破解），所以要破解数据库需要猜测潜在数百万个密钥。
- **医疗处方中的区块链应用**：医疗处方存在广泛的欺诈问题，如空白处方被盗或伪造，部分医生滥用系统。通过给患者发放代币，该代币不可转售且有有效期。患者向药剂师出示代币时，区块链会进行验证，确保患者拥有该代币且未使用过。
- **医疗物联网（IoMT）**：涉及医疗从业者、医疗保健管理、数据计算设施、IoMT数据、数据分析、通信等多个方面，通过无线或有线连接，将传感器/IoT设备的数据传输到网关、基站等。[此处有医疗物联网架构示意图]
- **医疗物联网面临的挑战**
    - 不同IoMT领域缺乏互操作性，不同的IoMT设备（如人体传感器、医疗设备）和多样的IoMT协议之间难以协同工作。
    - IoMT设备和系统存在隐私和安全漏洞。
    - 难以部署加密算法。
    - 数据外包到云端存在风险（如iCloud入侵事件，云端可能不可信）。
- **基于区块链的医疗物联网架构**：包含人工智能和机器学习/深度学习（AI and ML/DL）、链下数据、数据分析层、大数据、区块链节点、云计算、区块链网络层、虚拟映射、区块链（链上）数据、链下数据、边缘计算层、基站、物联网网关、边缘节点、设备层（如RFID设备）等。[此处有基于区块链的医疗物联网架构示意图]
- **基于区块链的医疗物联网在新冠疫情中的应用**：包括追踪疫情起源、隔离和社交距离管控、智能医院、医疗数据溯源、远程医疗和远程诊断等方面。

### 总结
区块链是一个跨学科领域，密码学和分布式系统是其基本构建模块。
| 操作 | 加密技术 |
| --- | --- |
| 初始化与广播交易 | 数字签名、公私钥 |
| 交易验证 | 工作量证明 |
| 区块链接 | 哈希函数 |

区块链涉及密码学、博弈论、理论计算机科学、编程语言、形式化方法、安全算法与数据结构、分布式系统等多个学科领域。 
