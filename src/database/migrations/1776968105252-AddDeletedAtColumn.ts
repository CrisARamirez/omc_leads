import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtColumn1776968105252 implements MigrationInterface {
    name = 'AddDeletedAtColumn1776968105252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leads" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leads" DROP COLUMN "deleted_at"`);
    }

}
