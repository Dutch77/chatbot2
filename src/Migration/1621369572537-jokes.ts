import {MigrationInterface, QueryRunner} from "typeorm";

export class jokes1621369572537 implements MigrationInterface {
    name = 'jokes1621369572537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jokes" ("id" SERIAL NOT NULL, "joke" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_ce9a1729216a79f4abd1e3774dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "jokes"`);
    }

}
