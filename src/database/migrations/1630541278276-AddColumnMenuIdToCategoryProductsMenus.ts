import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddColumnMenuIdToCategoryProductsMenus1630541278276
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "category_products_menus",
      new TableColumn({
        name: "menu_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "category_products_menus",
      new TableForeignKey({
        name: "MenuIdCategoryProductsMenus",
        columnNames: ["menu_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "menus",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "category_products_menus",
      "MenuIdCategoryProductsMenus"
    );

    await queryRunner.dropColumn("category_products_menus", "menu_id");
  }
}
