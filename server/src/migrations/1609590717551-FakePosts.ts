import { MigrationInterface, QueryRunner } from "typeorm";

export class FakePosts1609590717551 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {}

  public async down(_: QueryRunner): Promise<void> {}
}
