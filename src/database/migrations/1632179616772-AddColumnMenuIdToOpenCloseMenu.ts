import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddColumnMenuIdToOpenCloseMenu1632179616772
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "menu_open_close",
      new TableColumn({
        name: "menu_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "menu_open_close",
      new TableForeignKey({
        name: "MenuIdOpenCloseMenu",
        columnNames: ["menu_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "menus",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("menu_open_close", "MenuIdOpenCloseMenu");
    await queryRunner.dropColumn("menu_open_close", "menu_id");
  }
}
