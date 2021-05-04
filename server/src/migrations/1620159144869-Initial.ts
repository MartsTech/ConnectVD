import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1620159144869 implements MigrationInterface {
    name = 'Initial1620159144869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "email" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "video"`);
        await queryRunner.query(`ALTER TABLE "email" ADD "senderEmail" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "email" ADD "senderPhotoURL" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" DROP COLUMN "senderPhotoURL"`);
        await queryRunner.query(`ALTER TABLE "email" DROP COLUMN "senderEmail"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "video" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "email" ADD "to" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "email" ADD "from" character varying NOT NULL`);
    }

}
