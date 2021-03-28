FROM golang:1.15-alpine3.12 as go-builder
WORKDIR /root/
RUN apk add --no-cache git
RUN go get github.com/johnnylin-a/go-wol/cmd/wol
RUN go build github.com/johnnylin-a/go-wol/cmd/wol


FROM node:lts-alpine
RUN apk add --no-cache git
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY --from=go-builder /root/wol /root/
CMD yarn start