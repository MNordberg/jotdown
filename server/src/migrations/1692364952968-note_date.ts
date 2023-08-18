import { MigrationInterface, QueryRunner } from "typeorm";

export class NoteDate1692364952968 implements MigrationInterface {
    name = 'NoteDate1692364952968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "date" datetime NOT NULL CONSTRAINT DF__note__date__Now DEFAULT(GETDATE())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT DF__note__date__Now`)
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "date"`);
    }

}
