FROM node:14-alpine as builder

WORKDIR /app

COPY yarn.lock /app
COPY package.json /app

RUN yarn

COPY . /app

RUN yarn build

FROM node:14-alpine

COPY --from=builder /app/build /app/build

EXPOSE 80
ENV PORT 80

RUN yarn global add serve

CMD [ "serve", "-s","/app/build","-p","80"]