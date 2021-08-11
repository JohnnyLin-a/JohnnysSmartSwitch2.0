#!/bin/bash
docker run -it --rm -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -p 80:80 -p 443:443 certbot/certbot:$(cat .certbot_tag) renew
docker run --rm -w=/root/app -v $(pwd):/root/app -v /etc/letsencrypt:/root/certs alpine:latest /bin/sh -c "cp /root/certs/live/$(cat .domain_name)/*.pem /root/app/nginx/certs/"
docker exec ss_nginx nginx -s reload