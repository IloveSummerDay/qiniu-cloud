# Developer-Eval

## 项目介绍

本项目为参加上海七牛信息技术有限公司举办的第三年 1024 创作节而开发，旨在根据 GitHub 的开源项目数据，开发一款开发者评估应用。

## 项目内容

### 基础功能（必须实现）

1. **开发者技术能力评估（TalentRank）**：
   - 类似 Google 搜索的 PageRank，对开发者的技术能力进行评价/评级。
   - 评价/评级依据至少包含：项目的重要程度、该开发者在该项目中的贡献度。

2. **开发者的 Nation 猜测**：
   - 对于 Profile 中没有写明所属国家/地区的开发者，通过其关系网络猜测其 Nation。

3. **开发者的领域匹配**：
   - 根据领域搜索匹配开发者，并按 TalentRank 排序。
   - Nation 作为可选的筛选项，比如只显示所有位于中国的开发者。

## 高级功能（可选实现）

1. **数据置信度展示**：
   - 所有猜测的数据，应该有置信度。置信度低的数据在界面展示为 N/A 值。

2. **开发者技术能力评估信息自动整理**：
   - 基于类 ChatGPT 的应用整理出开发者评估信息。
   - 包括开发者在 GitHub 上的博客链接、用 GitHub 搭建的网站、账号相关介绍等。

### 安装和运行指南

1. 克隆仓库：
   ```bash
   git clone https://github.com/IloveSummerDay/qiniu-cloud.git
   cd qiniu-cloud
   ```

2. 安装依赖：
    - 安装前端依赖：
    ```bash
    cd frontend
    npm install
    ```
    - 安装后端依赖：
    ```bash
    cd ../backend
    npm install
    ```

3. 运行项目：
    - 运行前端：
    ```bash
    cd ../frountend
    npm start
    ```
    - 运行后端：
    ```bash
    cd ../backend
    npm start
    ```

### 联系方式
如果有任何问题或建议，请联系项目维护者：1751162157@qq.com
