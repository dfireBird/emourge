CREATE TABLE "Guild"
(
 "id" varchar(18) NOT NULL,
 CONSTRAINT "PK_guild" PRIMARY KEY ( "id" )
);

CREATE TABLE "Emoji"
(
 "id"        varchar(18) NOT NULL,
 "guild_id"  varchar(18) NOT NULL,
 "name"      varchar(32) NOT NULL,
 "animated"  boolean NOT NULL,
 "frequency" integer NOT NULL,
 CONSTRAINT "PK_emoji" PRIMARY KEY ( "id", "guild_id" ),
 CONSTRAINT "Guild_to_Emoji" FOREIGN KEY ( "guild_id" ) REFERENCES "Guild" ( "id" )
);

CREATE INDEX "fkIdx_13" ON "Emoji"
(
 "guild_id"
);
