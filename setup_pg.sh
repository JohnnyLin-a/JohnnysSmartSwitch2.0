#!/bin/bash
docker compose -f docker-compose-pg.yml up -d
docker exec -i ss_pg psql -U postgres -d postgres < ./setup.sql