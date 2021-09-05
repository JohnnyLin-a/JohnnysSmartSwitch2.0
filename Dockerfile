FROM golang:1.17-alpine as go-builder
WORKDIR /root/
RUN apk add --no-cache git
RUN git clone --depth 1 https://github.com/johnnylin-a/go-wol.git && cd go-wol && go build -o ../wol ./cmd/wol


FROM node:16-alpine
WORKDIR /root/app
RUN yarn global add nodemon
CMD nodemon -L ./bin/www.js 
COPY --from=go-builder /root/wol /root/