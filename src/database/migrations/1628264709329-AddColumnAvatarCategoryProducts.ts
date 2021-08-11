import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnAvatarCategoryProducts1628264709329
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "categories_products",
      new TableColumn({
        name: "category_avatar",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("categories_products", "category_avatar");
  }
}
