FROM node:18 AS builder

WORKDIR /usr/src/app

# 安装编译工具和依赖
RUN apt-get update && apt-get install -y python3 make g++ gcc sqlite3 libsqlite3-dev

# 安装 pnpm 和 node-gyp
RUN npm install -g pnpm node-gyp

# 复制 package 文件
COPY package*.json ./

# 设置镜像源和环境变量
RUN pnpm config set registry https://registry.npmmirror.com

# 设置环境变量强制从源码编译原生模块
ENV npm_config_build_from_source=true

# 安装所有依赖，强制编译原生模块
RUN pnpm install --no-frozen-lockfile

# 复制源码
COPY . .

FROM node:18

WORKDIR /usr/src/app

# 安装生产环境必要的包
RUN apt-get update && apt-get install -y \
    python3 make g++ gcc sqlite3 libsqlite3-dev

# 安装 pnpm 和全局依赖
RUN npm install -g pnpm cross-env node-gyp

# 设置环境变量
ENV NODE_ENV=production

# 从构建阶段复制文件
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/scripts ./scripts

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "run", "start:prod"]
