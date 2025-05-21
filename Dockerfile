# 使用完整的 Node.js 镜像，避免 Alpine 的兼容性问题
FROM node:18

WORKDIR /usr/src/app

# 安装编译工具和依赖
RUN apt-get update && apt-get install -y python3 make g++ \
    && npm install -g pnpm cross-env node-gyp

# 设置镜像源
RUN pnpm config set registry https://registry.npmmirror.com

# 先复制 package.json 和 pnpm-lock.yaml (如果存在)
COPY package.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install --no-frozen-lockfile

# 复制其余应用文件
COPY . .

# 设置环境变量
ENV NODE_ENV=production
ENV CONTAINER_ENV=true

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "run", "start:prod"]
