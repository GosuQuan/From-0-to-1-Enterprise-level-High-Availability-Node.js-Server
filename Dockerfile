# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# 安装pnpm
RUN npm install -g pnpm

# 复制package.json和package-lock.json
COPY package*.json ./

# 设置pnpm镜像源以加速安装
RUN pnpm config set registry https://registry.npmmirror.com

# 安装依赖
RUN pnpm install --no-frozen-lockfile

# 复制源代码
COPY . .

# 生产阶段
FROM node:18-alpine

WORKDIR /usr/src/app

# 安装pnpm和必要的全局依赖
RUN npm install -g pnpm cross-env

# 设置环境变量
ENV NODE_ENV=production

# 从构建阶段复制node_modules和构建文件
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/scripts ./scripts

# 暴露应用端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "run", "start:prod"]
