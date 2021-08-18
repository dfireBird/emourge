import {MigrationInterface, QueryRunner} from "typeorm";

export class init1629258238680 implements MigrationInterface {
    name = 'init1629258238680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."Guild" ("id" character varying(18) NOT NULL, CONSTRAINT "PK_3a6a2606e55e0d27070fd3d44bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "PK_guild" ON "public"."Guild" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."Emoji" ("id" character varying(18) NOT NULL, "name" character varying(32) NOT NULL, "animated" boolean NOT NULL, "frequency" integer NOT NULL, "guildId" character varying(18), CONSTRAINT "PK_9c5278546afba5fbae3275475b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "PK_emoji" ON "public"."Emoji" ("id") `);
        await queryRunner.query(`ALTER TABLE "public"."Emoji" ADD CONSTRAINT "FK_47065e2a36929f86348d0c8241c" FOREIGN KEY ("guildId") REFERENCES "public"."Guild"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Emoji" DROP CONSTRAINT "FK_47065e2a36929f86348d0c8241c"`);
        await queryRunner.query(`DROP INDEX "public"."PK_emoji"`);
        await queryRunner.query(`DROP TABLE "public"."Emoji"`);
        await queryRunner.query(`DROP INDEX "public"."PK_guild"`);
        await queryRunner.query(`DROP TABLE "public"."Guild"`);
    }

}
