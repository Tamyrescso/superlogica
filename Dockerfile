FROM node:20.8.0 AS builder

WORKDIR /workspace

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn build

FROM node:20.8.0

COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/package*.json ./
COPY --from=builder /workspace/dist ./dist
COPY --from=builder /workspace/prisma ./prisma

EXPOSE 3000

CMD [ "yarn", "start:migrate:seed:prod" ]
