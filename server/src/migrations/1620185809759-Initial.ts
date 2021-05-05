import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1620185809759 implements MigrationInterface {
    name = 'Initial1620185809759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "video"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "video" boolean NOT NULL DEFAULT false`);
    }

}
