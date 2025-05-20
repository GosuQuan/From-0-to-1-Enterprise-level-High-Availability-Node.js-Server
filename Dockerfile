FROM node:18 AS builder

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y python3 make g++ gcc

RUN npm install -g pnpm
COPY package*.json ./
RUN pnpm config set registry https://registry.npmmirror.com
RUN pnpm install --no-frozen-lockfile
COPY . .

FROM node:18

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y python3 make g++ gcc

RUN npm install -g pnpm cross-env

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/scripts ./scripts

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
