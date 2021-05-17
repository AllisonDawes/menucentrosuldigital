import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddMenuIdToProductsMenu1620782114436
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "products_menu",
      new TableColumn({
        name: "menu_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "products_menu",
      new TableForeignKey({
        name: "ProductsMenusMenu",
        columnNames: ["menu_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "menus",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("products_menu", "ProductsMenusMenu");
    await queryRunner.dropColumn("products_menu", "menu_id");
  }
}
