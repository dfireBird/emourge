#!/bin/sh

mongo "mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@localhost:27017/$MONGO_INITDB_DATABASE" --eval 'db.guilds.aggregate({"$unwind": "$emojiFrequency"}, {"$project": {"_id": 0, "id": "$emojiFrequency.emojiId", "guild_id": "$id" , "name": "$emojiFrequency.emojiName", "animated": "$emojiFrequency.animated", "frequency": "$emojiFrequency.frequency" } }, {"$out": "forcsv"})'

mongoexport --uri="mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@localhost:27017/$MONGO_INITDB_DATABASE" --collection forcsv --type=csv --out emojis.csv --fields id,guild_id,name,animated,frequency

mongoexport --uri="mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@localhost:27017/$MONGO_INITDB_DATABASE" --collection guilds --type=csv --out guilds.csv --fields id
