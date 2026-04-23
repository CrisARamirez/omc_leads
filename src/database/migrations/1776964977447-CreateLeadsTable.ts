import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLeadsTable1776964977447 implements MigrationInterface {
    name = 'CreateLeadsTable1776964977447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."leads_fuente_enum" AS ENUM('instagram', 'facebook', 'landing_page', 'referido', 'otro')`);
        await queryRunner.query(`CREATE TABLE "leads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "telefono" character varying(20), "fuente" "public"."leads_fuente_enum" NOT NULL, "producto_interes" character varying(150), "presupuesto" numeric(10,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_b3eea7add0e16594dba102716c5" UNIQUE ("email"), CONSTRAINT "PK_cd102ed7a9a4ca7d4d8bfeba406" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "leads"`);
        await queryRunner.query(`DROP TYPE "public"."leads_fuente_enum"`);
    }

}
