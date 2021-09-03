import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnAvatarCategoryProductsMenus1630540682596
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "category_products_menus",
      new TableColumn({
        name: "category_avatar",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("category_products_menus", "category_avatar");
  }
}
