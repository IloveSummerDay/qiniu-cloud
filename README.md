# Developer-Eval

## 项目介绍

本项目为参加上海七牛信息技术有限公司举办的第三年 1024 创作节而开发，旨在根据 GitHub 的开源项目数据，开发一款开发者评估应用。

[项目架构文档](./docs/structure.md)
[项目运行文档](./docs/run.md)

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

### 高级功能（可选实现）

1. **数据置信度展示**：
   - 所有猜测的数据，应该有置信度。置信度低的数据在界面展示为 N/A 值。

2. **开发者技术能力评估信息自动整理**：
   - 基于类 ChatGPT 的应用整理出开发者评估信息。
   - 包括开发者在 GitHub 上的博客链接、用 GitHub 搭建的网站、账号相关介绍等。

## 安装和运行指南

### 1. 克隆仓库

```bash
git clone https://github.com/IloveSummerDay/qiniu-cloud.git
cd qiniu-cloud
```

### 2. 安装依赖

项目开发使用Node.js版本 v21.2.0。

#### 自动安装

- **Linux 和 MacOS**：

  ```bash
  sh scripts/install.sh
  ```

- **Windows**：

  双击运行 `scripts` 目录下的 `install.bat` 文件。

#### 手动安装

```bash
cd front
npm install
cd ../node
npm install
```

### 3. 配置环境变量

在运行项目之前，需要先填充 `node` 目录下的 `.env` 文件，设置以下环境变量：

- `GITHUB_TOKEN`：从 [GithubDocs-创建 personal access token (classic)](https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#%E5%88%9B%E5%BB%BA-personal-access-token-classic) 获取。
- `DASHSCOPE_API_KEY`：从 [阿里云百炼](https://bailian.console.aliyun.com/#/home) 注册获取。

### 4. 运行项目

#### 自动运行

- **Linux 和 MacOS**：

  ```bash
  sh scripts/run.sh
  ```

- **Windows**：

  双击运行 `scripts` 目录下的 `run.bat` 文件。

#### 手动运行

- **运行前端**：

  前端启动本地服务 [http://localhost:5173](http://localhost:5173)

  ```bash
  cd front
  npm run dev
  ```

  点击进入 [http://localhost:5173](http://localhost:5173) 本地网站。

- **运行后端**：

  后端启动本地服务 [http://localhost:12306](http://localhost:12306)

  ```bash
  cd ../node
  npm start
  ```

  当看到日志 `Server is running on port 12306` 时，即表示后端服务启动成功。

### 使用说明

前端页面中可根据 GitHub 开发者用户名进行搜索，按 Nation 等领域进行划分，所得开发者评估信息列表根据 TalentValue 降序排序。

#### 演示视频

[演示视频](https://github.com/IloveSummerDay/qiniu-cloud/blob/76d9c033f2f03420fe50d3f62ba91e557d3bce2e/docs/Demo%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91.mp4)

### 联系方式

如果有任何问题或建议，请联系项目维护者：1923855461@qq.com，1751162157@qq.com
