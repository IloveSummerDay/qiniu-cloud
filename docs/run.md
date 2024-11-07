# 项目运行文档

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
