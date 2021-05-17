import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnBackgroundIdMenu1620779736004
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "menus",
      new TableColumn({
        name: "background_menu_id",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("menus", "background_menu_id");
  }
}
