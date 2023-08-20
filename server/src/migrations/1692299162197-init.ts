import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1692299162197 implements MigrationInterface {
  name = 'Init1692299162197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `If(db_id(N'jotdown') IS NULL) BEGIN CREATE DATABASE jotdown END`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "firstName" nvarchar(255) NOT NULL, "lastName" nvarchar(255) NOT NULL, "isActive" bit NOT NULL CONSTRAINT "DF_fde2ce12ab12b02ae583dd76c7c" DEFAULT 1, "avatarUrl" nvarchar(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "note" ("id" int NOT NULL IDENTITY(1,1), "text" nvarchar(300) NOT NULL, "userId" int, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO dbo.user (firstName, lastName, isActive, avatarUrl) VALUES ('Terry', 'Dunn', true, 'https://randomuser.me/api/portraits/men/38.jpg')`,
    );
    await queryRunner.query(
      `INSERT INTO dbo.user (firstName, lastName, isActive, avatarUrl) VALUES ('Phillip', 'Holmes', true, 'https://randomuser.me/api/portraits/men/82.jpg')`,
    );
    await queryRunner.query(
      `INSERT INTO dbo.user (firstName, lastName, isActive, avatarUrl) VALUES ('Bonnie', 'Meyer', true, 'https://randomuser.me/api/portraits/women/2.jpg')`,
    );
    await queryRunner.query(
      `INSERT INTO dbo.user (firstName, lastName, isActive, avatarUrl) VALUES ('Johnny', 'Adams', false, 'https://randomuser.me/api/portraits/men/97.jpg')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`,
    );
    await queryRunner.query(`DROP TABLE "note"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(
      `If(db_id(N'jotdown') IS NOT NULL) BEGIN DROP DATABASE jotdown END`,
    );
  }
}
