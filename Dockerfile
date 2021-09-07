FROM golang:1.17-alpine as go-builder
WORKDIR /root/
RUN apk add --no-cache git
RUN git clone --depth 1 https://github.com/johnnylin-a/go-wol.git && cd go-wol && go build -o ../wol ./cmd/wol


FROM node:16-alpine as node-lib

FROM alpine:latest
WORKDIR /root/app
CMD sh -c "node ./bin/www.js"
COPY --from=node-lib /usr/local/bin/node /usr/local/bin/node
COPY --from=go-builder /root/wol /root/