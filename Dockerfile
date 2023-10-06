FROM node:20.8.0

WORKDIR /workspace

COPY package*.json ./

RUN yarn
RUN yarn global add prisma

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:migrate:seed:dev" ]
