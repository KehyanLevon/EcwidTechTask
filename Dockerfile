FROM node:20-alpine

WORKDIR /app

COPY . .

WORKDIR /app/frontend
RUN yarn install && yarn build

WORKDIR /app/backend
RUN yarn install

EXPOSE 3000
CMD ["node", "server.js"]
