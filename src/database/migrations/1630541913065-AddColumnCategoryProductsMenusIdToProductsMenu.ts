import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddColumnCategoryProductsMenusIdToProductsMenu1630541913065
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "products_menu",
      new TableColumn({
        name: "category_products_menus_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "products_menu",
      new TableForeignKey({
        name: "CategoryProductsMenusIdProductsMenu",
        columnNames: ["category_products_menus_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "category_products_menus",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "products_menu",
      "CategoryProductsMenusIdProductsMenu"
    );

    await queryRunner.dropColumn("products_menu", "category_products_menus_id");
  }
}
