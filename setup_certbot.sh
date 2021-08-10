#!/bin/bash
docker pull alpine:latest
docker run -it --rm -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -p 80:80 -p 443:443 certbot/certbot:$(cat .certbot_tag) certonly
docker run -it --rm -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -p 80:80 -p 443:443 certbot/certbot:$(cat .certbot_tag) renew --dry-run
mkdir -p nginx/certs
docker run --rm -w=/root/app -v $(pwd):/root/app -v /etc/letsencrypt:/root/certs alpine:latest /bin/sh -c "cp /root/certs/live/$(cat .domain_name)/*.pem /root/app/nginx/certs/"