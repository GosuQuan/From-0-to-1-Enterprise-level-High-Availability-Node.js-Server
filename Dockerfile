# 使用完整的 Node.js 镜像，避免 Alpine 的兼容性问题
FROM node:18

WORKDIR /usr/src/app

# 安装 pnpm 和 cross-env
RUN npm install -g pnpm cross-env

# 设置镜像源
RUN pnpm config set registry https://registry.npmmirror.com

# 复制应用文件
COPY . .

# 安装依赖，跳过 SQLite3 等原生模块
RUN pnpm install --no-frozen-lockfile --ignore-scripts

# 设置环境变量
ENV NODE_ENV=production
ENV CONTAINER_ENV=true

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "run", "start:prod"]
