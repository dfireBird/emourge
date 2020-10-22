#!/bin/sh
psql -d emourge -U "${POSTGRES_USER}" -a -f /create_tables.sql

psql -d emourge -U "${POSTGRES_USER}" -c "\\copy public.\"Guild\" from /guilds.csv delimiter ',' csv header;"

psql -d emourge -U "${POSTGRES_USER}" -c "\\copy public.\"Emoji\" from /emojis.csv delimiter ',' csv header;"
