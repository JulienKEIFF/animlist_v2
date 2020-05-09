FROM alpine:3.11 as builder

RUN apk --no-cache add gcc g++ make python nodejs npm
WORKDIR /animlist
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM alpine:3.11
RUN apk --no-cache add nodejs npm
WORKDIR /animlist
COPY --from=builder /animlist/dist ./dist
RUN npm i express
COPY --from=builder /animlist/server.js .
CMD ["node", "server"]