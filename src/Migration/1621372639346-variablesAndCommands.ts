import {MigrationInterface, QueryRunner} from "typeorm";

export class variablesAndCommands1621372639346 implements MigrationInterface {
    name = 'variablesAndCommands1621372639346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "commands" ("id" SERIAL NOT NULL, "name" text NOT NULL, "value" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_7ac292c3aa19300482b2b190d1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_87632c6d4596995f1346b23c0c" ON "commands" ("name") `);
        await queryRunner.query(`CREATE TABLE "variables" ("id" SERIAL NOT NULL, "name" text NOT NULL, "value" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_395ef5737c2bfc06e701bd2f7e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_769126a4dcdb6e285117a75a17" ON "variables" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_769126a4dcdb6e285117a75a17"`);
        await queryRunner.query(`DROP TABLE "variables"`);
        await queryRunner.query(`DROP INDEX "IDX_87632c6d4596995f1346b23c0c"`);
        await queryRunner.query(`DROP TABLE "commands"`);
    }

}
