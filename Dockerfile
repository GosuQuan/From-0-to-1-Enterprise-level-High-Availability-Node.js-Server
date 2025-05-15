FROM node:16

WORKDIR /usr/app/00-static
COPY . .
RUN npm install

EXPOSE 9000
CMD ["npm", "start"]
