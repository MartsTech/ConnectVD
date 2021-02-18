import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1612706129181 implements MigrationInterface {
    name = 'Initial1612706129181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email" ("id" SERIAL NOT NULL, "senderId" character varying NOT NULL, "receiverId" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "subject" character varying NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "displayName" character varying NOT NULL, "photoUrl" character varying, "status" character varying NOT NULL DEFAULT 'available', "socketId" character varying, "roomId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend" ("userId" character varying NOT NULL, "friendId" character varying NOT NULL, "id" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_240655bf8eba5e0d2ce943502a3" PRIMARY KEY ("userId", "friendId"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_855044ea856e46f62a46acebd65" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_855044ea856e46f62a46acebd65"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "friend"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "email"`);
    }

}
