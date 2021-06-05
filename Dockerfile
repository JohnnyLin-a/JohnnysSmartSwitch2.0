FROM golang:1.16-alpine3.12 as go-builder
WORKDIR /root/
RUN apk update && apk add --no-cache git
RUN git clone https://github.com/sabhiram/go-wol.git
WORKDIR /root/go-wol
RUN go build -o /root/wol ./cmd/wol


FROM node:16-alpine3.12
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY --from=go-builder /root/wol /root/
CMD yarn start