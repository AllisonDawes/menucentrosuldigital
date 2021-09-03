import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddColumnCategoryIdToCategoryProductsMenus1630540991608
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "category_products_menus",
      new TableColumn({
        name: "category_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "category_products_menus",
      new TableForeignKey({
        name: "CategoryIdCategoryProductsMenus",
        columnNames: ["category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories_products",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "category_products_menus",
      "CategoryIdCategoryProductsMenus"
    );

    await queryRunner.dropColumn("category_products_menus", "category_id");
  }
}
