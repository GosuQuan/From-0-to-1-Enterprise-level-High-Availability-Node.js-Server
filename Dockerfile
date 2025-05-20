FROM node:18 AS builder

WORKDIR /usr/src/app

# 安装编译工具和依赖
RUN apt-get update && apt-get install -y python3 make g++ gcc sqlite3 libsqlite3-dev

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package 文件
COPY package*.json ./

# 设置镜像源
RUN pnpm config set registry https://registry.npmmirror.com

# 强制从源码编译 SQLite3
RUN pnpm install --no-frozen-lockfile sqlite3 --build-from-source

# 安装其他依赖
RUN pnpm install --no-frozen-lockfile

# 复制源码
COPY . .

# 显示编译后的 SQLite3 模块信息
RUN ls -la node_modules/.pnpm/sqlite3*/node_modules/sqlite3/lib/binding/

FROM node:18

WORKDIR /usr/src/app

# 安装生产环境必要的包
RUN apt-get update && apt-get install -y python3 make g++ gcc sqlite3 libsqlite3-dev

# 安装 pnpm 和全局依赖
RUN npm install -g pnpm cross-env node-gyp

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/scripts ./scripts

EXPOSE 3000

# 添加调试信息
RUN ls -la node_modules/.pnpm/sqlite3*/node_modules/sqlite3/lib/binding/

# 启动应用
CMD ["pnpm", "run", "start:prod"]
