import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUser1614640650701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "admin",
            type: "boolean",
            default: false,
          },
          {
            name: "enterprise",
            type: "boolean",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "uf",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
