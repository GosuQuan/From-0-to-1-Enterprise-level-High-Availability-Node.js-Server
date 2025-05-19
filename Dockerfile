# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# 复制package.json和package-lock.json
COPY package*.json ./

# 设置npm镜像源以加速安装
RUN npm config set registry https://registry.npmmirror.com

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 生产阶段
FROM node:18-alpine

WORKDIR /usr/src/app

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
CMD ["npm", "run", "start:prod"]
