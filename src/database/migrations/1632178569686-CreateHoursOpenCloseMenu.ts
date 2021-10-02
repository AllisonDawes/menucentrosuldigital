import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateHoursOpenCloseMenu1632178569686
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "menu_open_close",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "status",
            type: "boolean",
            default: false,
          },
          {
            name: "hour_open",
            type: "timestamp",
          },
          {
            name: "hour_close",
            type: "timestamp",
          },
          {
            name: "active",
            type: "boolean",
            default: true,
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
    await queryRunner.dropTable("menu_open_close");
  }
}
