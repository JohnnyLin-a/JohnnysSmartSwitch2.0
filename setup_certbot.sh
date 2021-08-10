#!/bin/bash
docker run -it --rm -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -p 80:80 -p 443:443 certbot/certbot:$(cat .certbot_tag) certonly
docker run -it --rm -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -p 80:80 -p 443:443 certbot/certbot:$(cat .certbot_tag) renew --dry-run