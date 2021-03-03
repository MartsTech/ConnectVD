import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1614808424872 implements MigrationInterface {
    name = 'Initial1614808424872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "PK_240655bf8eba5e0d2ce943502a3"`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "PK_b5c6979cb06a58042bf0a446f83" PRIMARY KEY ("userId", "friendId", "status")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "photoUrl" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."photoUrl" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."photoUrl" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "photoUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "PK_b5c6979cb06a58042bf0a446f83"`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "PK_240655bf8eba5e0d2ce943502a3" PRIMARY KEY ("userId", "friendId")`);
    }

}
