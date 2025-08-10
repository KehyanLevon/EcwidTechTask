FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable

COPY frontend/package.json frontend/yarn.lock ./frontend/
COPY backend/package.json  backend/yarn.lock  ./backend/
RUN cd frontend && yarn install --frozen-lockfile && cd .. \
 && cd backend  && yarn install --frozen-lockfile

COPY frontend ./frontend
RUN cd frontend && yarn build

COPY backend ./backend
RUN cd backend && yarn build

RUN mkdir -p backend/dist/public && \
    if [ -d backend/public ]; then cp -r backend/public/* backend/dist/public/; fi

RUN mkdir -p backend/frontend && cp -r frontend/dist backend/frontend/dist

FROM node:20-alpine AS runner
WORKDIR /app/backend
ENV NODE_ENV=production
RUN corepack enable

COPY backend/package.json backend/yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=build /app/backend/dist     ./dist
COPY --from=build /app/backend/frontend ./frontend

EXPOSE 3000
CMD ["node", "dist/server.js"]
