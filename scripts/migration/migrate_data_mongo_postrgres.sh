#!/bin/sh

GREEN='\033[0;32m'
NC='\033[0m'

# initialization
echo -e "${GREEN}Starting${NC}"
docker-compose up -d db db_postgres

# Export and copy data out mongo container
echo -e "${GREEN} Exporting data${NC}"
docker cp scripts/migration/mongo_csv_dump.sh emourge_db:/mongo_csv_dump.sh

docker exec emourge_db /mongo_csv_dump.sh

echo -e "${GREEN} Copying data out of mongo${NC}"
docker cp emourge_db:/guilds.csv scripts/migration/guilds.csv
docker cp emourge_db:/emojis.csv scripts/migration/emojis.csv

# Copy and import data into postges container
echo -e "${GREEN} Copying data into of postgres${NC}"
sleep 5

docker cp emourge_db:/guilds.csv scripts/migration/guilds.csv
docker cp scripts/migration/guilds.csv emourge_postgres:/guilds.csv
docker cp scripts/migration/emojis.csv emourge_postgres:/emojis.csv
docker cp scripts/migration/create_tables.sql emourge_postgres:/create_tables.sql
docker cp scripts/migration/postgres_import_data.sh emourge_postgres:/postgres_import_data.sh

echo -e "${GREEN} Importing data${NC}"
docker exec emourge_postgres /postgres_import_data.sh

echo -e "${GREEN} Finishing${NC}"
rm -rf scripts/migration/*.csv
