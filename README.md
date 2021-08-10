# Setup SS

1. setup these files following the templates/examples:
   - nginx/conf.d/app.conf
   - .env
   - .certbot_tag
   - crontab.txt
   - .domain_name
2. ./setup.sh
3. docker-compose up -d
4. ./setup_certbot.sh
5. setup crontab (following crontab.txt.example)
