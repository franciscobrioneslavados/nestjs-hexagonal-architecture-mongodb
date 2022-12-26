# First Stage : to install and build dependences
FROM node:14-alpine3.17 AS builder
ENV NODE_ENV build

WORKDIR /app

COPY . /app

RUN npm cache clean --force
RUN npm install
RUN npm run build
RUN npm prune --production
# ---

# Second Stage : Setup command to run your app
FROM node:14-alpine3.17

ENV NODE_ENV production
USER node
WORKDIR /app

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/

EXPOSE 5000

ENTRYPOINT [ "npm run start:prod -p $PORT" ]
